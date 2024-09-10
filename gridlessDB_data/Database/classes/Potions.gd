extends Resource
class_name Potions

export (String) var key = ""
export (String) var display_name = ""
export (String) var sprite = ""
enum SlotAs {Red, Green, Blue}
export(SlotAs) var slot_a = SlotAs.Red
enum SlotBs {Red, Green, Blue}
export(SlotBs) var slot_b = SlotBs.Red
enum SlotCs {Red, Green, Blue}
export(SlotCs) var slot_c = SlotCs.Red
export (String) var description = ""
