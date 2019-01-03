import RecurringSelectDialog from './recurring_select_dialog'

# @plugin_instance = new RecurringSelect(@element)
#
# $element.on 'focus', (e) => @plugin_instance.set_initial_values()
# $element.on 'change', (e) => @plugin_instance.changed()

import Plugin from './plugin'

export default class RecurringSelect extends Plugin
  @defaults =
    debug: false

  init: ->

  destroy: ->
    @dialog_instance.destroy() if @dialog_instance
    @dialog_instance = undefined

  get_data: (name) ->
    @$element.data(name)

  set_initial_values: ->
    @$element.data 'initial-value-hash', @$element.val()
    @$element.data 'initial-value-str', $(@$element.find("option").get()[@$element.prop("selectedIndex")]).text()

  changed: ->
    if @$element.val() == "custom"
      @open_custom()
    else
      @set_initial_values()

  open_custom: ->
    @$element.data "recurring-select-active", true
    @dialog_instance = new RecurringSelectDialog(@element, input_instance: @)
    @$element.blur()

  save: (new_rule) ->
    @$element.find("option[data-custom]").remove()
    new_json_val = JSON.stringify(new_rule.hash)

    # TODO: check for matching name, and replace that value if found

    if $.inArray(new_json_val, @$element.find("option").map((el) -> $(this).val())) == -1
      @insert_option(new_rule.str, new_json_val)

    @$element.val(new_json_val)
    @set_initial_values()
    @$element.trigger "recurring_select:save"

  current_rule: ->
    str:  @$element.data("initial-value-str")
    hash: $.parseJSON(@$element.data("initial-value-hash"))

  cancel: ->
    @$element.val @$element.data("initial-value-hash")
    @$element.data "recurring-select-active", false
    @$element.trigger "recurring_select:cancel"


  insert_option: (new_rule_str, new_rule_json) ->
    separator = @$element.find("option:disabled")
    if separator.length == 0
      separator = @$element.find("option")
    separator = separator.last()

    new_option = $(document.createElement("option"))
    new_option.attr "data-custom", true

    if new_rule_str.substr(new_rule_str.length - 1) != "*"
      new_rule_str+="*"

    new_option.text new_rule_str
    new_option.val new_rule_json
    new_option.insertBefore separator
