
Hooks.on("ready", function() {
  console.log("Theurge (13th Age) class injecting data into the system...");

  // Add new class name to classList
  CONFIG.ARCHMAGE.classList["theurge"] = "Theurge";

  // Add class stats to classes - this enables base stats autoconfiguration
  CONFIG.ARCHMAGE.classes["theurge"] = {
    hp: 6,
    ac_lgt: 11,
    ac_hvy: 14,
    ac_hvy_pen: -3,
    shld_pen: -1,
    pd: 11,
    md: 11,
    rec_die: 6,
    wpn_1h: 4,
    wpn_2h: 6,
    wpn_2h_pen: 0,
    wpn_rngd: 4,
    skilled_warrior: false
  };

  /* 
   * Add some picks to keyModifiers - this sets the default Key Modifier
   * upon selecting two recognized class names.
   * Due to the way this is stored in the system the new class must be added
   * to all other classes that come earlier in alphabetical order and all
   * classes that come after it must be added to this class entry.
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
  console.log(CONFIG.ARCHMAGE);
  console.log("Theurge (13th Age) class loaded succesfully." );
});
