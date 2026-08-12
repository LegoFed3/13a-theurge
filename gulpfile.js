// Dependencies for build tasks.
const gulp = require('gulp');
const yaml = require('gulp-yaml');
const data = require ('gulp-data');

// @todo replace with `require('child_process').exec` as in https://www.npmjs.com/package/gulp-exec
const shell = require('gulp-shell');

// Dependencies for compendium tasks.
const mergeStream = require("merge-stream");
const fs = require("fs");
const path = require("path");
const clean = require("gulp-clean");

// Constants.
const PACK_SRC = "src";
const PACK_DEST = "packs";

/* ----------------------------------------- */
/*  Compile Compendia
/* ----------------------------------------- */

/**
 * Gulp Task: Compile packs from the yaml source content to .db files.
 */
function compilePacks() {
  // Every folder in the src dir will become a compendium.
  const folders = fs.readdirSync(PACK_SRC).filter((file) => {
    return fs.statSync(path.join(PACK_SRC, file)).isDirectory();
  });

  const packs = folders.map((folder) => {
    return gulp.src(path.join(PACK_SRC, folder))
      .pipe(shell([
        `fvtt package --id 13a-theurge --type Module pack <%= file.stem %> -c --yaml --in "<%= file.path %>" --out ${PACK_DEST}`
      ]))
  })

  return mergeStream.call(null, packs);
}

/**
 * Cleanup the packs directory.
 *
 * This task will delete the existing compendiums so that the compile task can
 * write fresh copies in their place.
 */
function cleanPacks() {
  return gulp.src(`${PACK_DEST}`, { allowEmpty: true }, {read: false}).pipe(clean());
}

/* ----------------------------------------- */
/*  Export Compendia
/* ----------------------------------------- */

/**
 * Gulp Task: Export Packs
 *
 * This gulp task will load all compendium .db files from the dest directory,
 * load them into memory, and then export them to a human-readable YAML format.
 */
function extractPacks() {
  // Start a stream for all db files in the packs dir.
  const packs = gulp.src(`${PACK_DEST}/*`)
    .pipe(shell([
      'fvtt package --id 13a-theurge --type Module unpack <%= file.stem %> -c --yaml --in packs --out src/<%= file.stem %>'
    ]));

  // Call the streams.
  return mergeStream.call(null, packs);
}

/* ----------------------------------------- */
/*  Compile YAML
/* ----------------------------------------- */
const MODULE_YAML = [
  './src/**/*.{yaml,yml}',
  '!./src/packs/**/*.{yaml,yml}'
];
function compileYaml(protected = false) {
  const compiledContent = gulp.src(MODULE_YAML)
    .pipe(yaml({ space: 2 }));

  if (protected) {
    return compiledContent.pipe(data((file) => {
      // Parse the current JSON contents
      const jsonContent = JSON.parse(file.contents.toString());

      // If this is the manifest, adjust it.
      const fileName = path.basename(file.path);
      if (fileName === 'module.json' || fileName === 'module.yaml') {
        // Inject the required property
        jsonContent.manifest = `https://raw.githubusercontent.com/LegoFed3/13a-theurge/main/module.json`;
        jsonContent.protected = true;
      }

      // Re-assign the modified buffer back to the file
      file.contents = Buffer.from(JSON.stringify(jsonContent, null, 2));
    }))
    .pipe(gulp.dest('./dist'));
  }
  else {
    return compiledContent.pipe(gulp.dest('./dist'))
  }
}
const yamlTask = gulp.series(compileYaml);

/* ----------------------------------------- */
/* Copy files
/* ----------------------------------------- */
const MODULE_COPY = [
  '!dist',
  'src/assets/**/*',
  'src/module/**/*',
  // 'src/scripts/**/*',
  // 'src/templates/**/*',
];
function copyFiles() {
  return gulp.src(MODULE_COPY, {base: 'src', encoding: false})
    .pipe(gulp.dest('./dist'))
}
function copyLicense() {
  return gulp.src('LICENSE.md')
    .pipe(gulp.dest('./dist'))
}
const copyTask = gulp.series(copyFiles, copyLicense);

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
  gulp.watch(MODULE_YAML, yamlTask);
  gulp.watch(MODULE_COPY, copyTask);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(
  gulp.parallel(
    compileYaml,
    copyTask,
  ),
  watchUpdates
);
exports.yaml = yamlTask;
exports.files = copyTask;
exports.cleanPacks = gulp.series(cleanPacks);
exports.compilePacks = gulp.series(cleanPacks, compilePacks);
exports.extractPacks = gulp.series(extractPacks);
exports.build = gulp.series(
  cleanPacks,
  gulp.parallel(
    () => compileYaml(false),
    compilePacks,
    copyTask,
  ),
);
exports.buildProd = gulp.series(
  cleanPacks,
  gulp.parallel(
    () => compileYaml(true),
    compilePacks,
    copyTask,
  ),
);