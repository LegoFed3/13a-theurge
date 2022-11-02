
Hooks.on("ready", function() {
  console.log("Theurge (13th Age) class injecting data into the system...");

  /*
   * Add new race - this enables race recognition.
   */
  // ARCHMAGE.raceList["newrace"] = "NewRace";

  /*
   * Add new class name to classList - this enable class recognition.
   */
  CONFIG.ARCHMAGE.classList["theurge"] = "Theurge";

  /*
   * Add class stats to classes - this enables base stats autoconfiguration.
   */
  CONFIG.ARCHMAGE.classes["theurge"] = {
    hp: 6,                  // Base hp modifier
    ac_lgt: 11,             // Base AC in light/no armor (best value)
    ac_hvy: 14,             // Base AC in heavy armour
    ac_hvy_pen: -3,         // Attack penalty for wearing heavy armour
    shld_pen: -1,           // Attack penalty for using a shield
    pd: 11,                 // Base PD
    md: 11,                 // Base MD
    rec_die: 6,             // Recovery die size (number of faces), before talents/feats
    wpn_1h: 4,              // Weapon die size (# of faces), one-handed melee (best number without penalty)
    wpn_2h: 6,              // Weapon die size (# of faces), two-handed melee (best number without penalty if possible)
    wpn_2h_pen: 0,          // Attack penalty for using indicated two-handed weapon
    wpn_rngd: 4,            // Weapon die size (# of faces), ranged (best number without penalties)
    skilled_warrior: false  // Whether the class counts as a skilled warrior for multiclassing purposes
  };

  /*
   * Add class description pack - adds descriptions to class page in power importer.
   */
  CONFIG.ARCHMAGE.classPacks.push("classes-theurge");

  /* 
   * Add some picks to keyModifiers - this sets the default Key Modifier upon selecting two recognized class names.
   * Due to the way this is stored in the system the new class must be added to all other classes that come earlier in
   * alphabetical order and all classes that come after it must be added to this class entry.
   */
  CONFIG.ARCHMAGE.keyModifiers['barbarian']['theurge'] = ['str', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['bard']['theurge'] = ['int', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['chaosmage']['theurge'] = ['int', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['cleric']['theurge'] = ['wis', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['commander']['theurge'] = ['str', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['druid']['theurge'] = ['wis', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['fighter']['theurge'] = ['str', 'int'];
  CONFIG.ARCHMAGE.keyModifiers['monk']['theurge'] = ['dex', 'wis'];
  CONFIG.ARCHMAGE.keyModifiers['necromancer']['theurge'] = ['int', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['occultist']['theurge'] = ['int', 'wis'];
  CONFIG.ARCHMAGE.keyModifiers['paladin']['theurge'] = ['str', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['ranger']['theurge'] = ['str', 'wis'];
  CONFIG.ARCHMAGE.keyModifiers['rogue']['theurge'] = ['dex', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['rogue']['theurge'] = ['dex', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['sorcerer']['theurge'] = ['int', 'cha'];
  CONFIG.ARCHMAGE.keyModifiers['theurge'] = {
    'wizard': ['int', 'cha'],
  };

  /*
   * Add custom resources - this configures the specified resource(s) and its(their) rest behavior.
   * These are stored as an array of couples (arrays) with the resource label and rest behavior, such as:
   * - none: do not modify the resource on resting
   * - quick: refill the resource on any rest
   * - full: refill the resource on a full heal up only
   * - quickreset: reset the resource to zero on any rest
   * - fullreset: reset the resource to zero on a full heal up only
   */
  // CONFIG.ARCHMAGE.classResources['theurge'] = [["My New Resource 1", "quick"], ["My New Resource 2", "none"]];

  console.log("Theurge (13th Age) class loaded succesfully." );
});
