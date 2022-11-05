# Theurge (13th Age) Class for the Toolkit13 System

This Foundry VTT module adds the community-adapted [Theurge](https://www.13thagesrd.com/classes/3rd-party-classes/theurge-3pp/) class (revision 2.7.0) for 13th Age to the Toolkit13 system. It also serves as an example of how to add new classes to said system, as detailed below.

## Installation
Either search for "Theurge (13th Age)" in Foundry's module browser or click Install Module and enter the following URL: https://raw.githubusercontent.com/LegoFed3/13a-theurge/main/module.json

Click Install and wait for the installation to complete.

## Compatibility

Compatible with Foundry VTT v10 and later.
Requires Toolkit13 (13th Age compatible) system version 1.23.0 or later.
Tested with Foundry VTT v10 and Toolkit13 version 1.23.0.

## Adding new Class and Race content to Toolkit13

To work with the system any new content *must* be packaged into dedicated compendiums as described below.
Furthermore, *new* classes and races *must* be added to the system's internal configuration with a small Javascript hook, as shown in `scripts/setup.js`.
For classes, this includes adding a compressed version of the important class numbers such as base defences and hp, weapon and recovery die sizes, etc. as well as *optionally* some hints regarding default multiclass Key Modifier choices for known class combinations and any custom resource the system should set up to support the class' powers. This data is used to autoconfigure a character actor when setting its class.

Note: a pack's name is its `name` property defined in your module's `module.json` or world's `world.json` files. The latter defaults to the lower case of the `label` that is entered and shown in Foundry's UI.

### Racial Powers

- Pack type: item
- Pack name: races (exact match)

Racial  powers must have the race name in the Power Source field. For powers available to multiple races, or races with multiple names, separate them with "\/" such as in 'Dragonic \/ Dragonspawn' and note that the names must corresponds to the values in `CONFIG.ARCHMAGE.raceList` (note: new races have to be added to that object for the system to recognize them).

### Class Powers

- Pack type: item
- Pack name: the class name (as it appears in the property name of `CONFIG.ARCHMAGE.classList`, i.e., without spaces) 

Class powers are organized based on their type and level in the power importer. If no level is set, they are assumed to be level 1.
Features are always shown on top, and pre-selected unless already present on the actor.

### Class Descriptions

- Pack type: journal
- Pack name: classes (must include this substring in the name)

Class descriptions are included at the top of the related page in the power importer, and should contain an overview of the class, its important stats and its progression table.
To be correctly matched to the related class a journal's name must coincide exactly with the related class name value stored in `CONFIG.ARCHMAGE.raceList`.

