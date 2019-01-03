import Plugin from './plugin'

export default class RecurringSelectDialog extends Plugin
  @defaults =
    debug: false
    name: 'recurring_select_dialog'
    monthly:
      show_week: [true, true, true, true, false, false]
    texts:
      locale_iso_code: "en"
      repeat: "Repeat"
      last_day: "Last Day"
      frequency: "Frequency"
      daily: "Daily"
      weekly: "Weekly"
      monthly: "Monthly"
      yearly: "Yearly"
      every: "Every"
      days: "day(s)"
      weeks_on: "week(s) on"
      months: "month(s)"
      years: "year(s)"
      day_of_month: "Day of month"
      day_of_week: "Day of week"
      cancel: "Cancel"
      ok: "OK"
      summary: "Summary"
      first_day_of_week: 0
      days_first_letter: ["S", "M", "T", "W", "T", "F", "S" ]
      order: ["1st", "2nd", "3rd", "4th", "5th", "Last"]
      show_week: [true, true, true, true, false, false]

  init: ->
    @current_rule = @options.input_instance.current_rule()
    @position = @options.input_instance.get_data('recurring-select-position')

    @initDialogBox()
    if not @current_rule.hash? or not @current_rule.hash.rule_type?
      @freqChanged()
    else if @position != 'inline'
      setTimeout @positionDialogVert, 10 # allow initial render

  destroy: ->

  initDialogBox: ->
    $(".rs_dialog_holder").remove()

    open_in = if @position == 'inline'
      @$element.parent()
    else
      $("body")

    open_in = $(".ui-page-active") if $(".ui-page-active").length
    open_in.append @template()
    @outer_holder = $(".rs_dialog_holder")
    @outer_holder.addClass @position
    @inner_holder = @outer_holder.find ".rs_dialog"
    @content = @outer_holder.find ".rs_dialog_content"
    @positionDialogVert(true) unless @position == 'inline'
    @mainEventInit()
    @freqInit()
    @summaryInit()
    @outer_holder.trigger "recurring_select:dialog_opened"
    @freq_select.focus()

  positionDialogVert: (initial_positioning) =>
    window_height = $(window).height()
    window_width  = $(window).width()
    dialog_height = @content.outerHeight()
    if dialog_height < 80
      dialog_height = 80
    margin_top = (window_height - dialog_height)/2 - 30
    margin_top = 10 if margin_top < 10
    # if dialog_height > window_height - 20
    #   dialog_height = window_height - 20

    new_style_hash =
      "margin-top" : margin_top+"px"
      "min-height" : dialog_height+"px"

    if initial_positioning?
      @inner_holder.css new_style_hash
      @inner_holder.trigger "recurring_select:dialog_positioned"
    else
      @inner_holder.addClass "animated"
      @inner_holder.animate new_style_hash, 200, =>
        @inner_holder.removeClass "animated"
        @content.css {"width": "auto"}
        @inner_holder.trigger "recurring_select:dialog_positioned"

  cancel: (e) =>
    e.preventDefault() if e
    @outer_holder.remove()
    @options.input_instance.cancel()
    $('body').off('click.recurring_select_cancel')

  outerCancel: (event) =>
    if $(event.target).hasClass("rs_dialog_holder")
      @cancel()

  save: =>
    return if !@current_rule.str?
    @outer_holder.remove()
    @options.input_instance.save(@current_rule)
    $('body').off('click.recurring_select_cancel')

# ========================= Init Methods ===============================

  mainEventInit: ->
    # Tap hooks are for jQueryMobile
    @outer_holder.on 'click', @outerCancel.bind(this)
    @content.on 'click', 'h1 a', @cancel.bind(this)
    @save_button = @content.find('input.rs_save').on "click", @save.bind(this)
    @content.find('input.rs_cancel').on "click", @cancel.bind(this)

  freqInit: ->
    @freq_select = @outer_holder.find ".rs_frequency"
    if @current_rule.hash? && (rule_type = @current_rule.hash.rule_type)?
      if rule_type.search(/Weekly/) != -1
        @freq_select.prop('selectedIndex', 1)
        @initWeeklyOptions()
      else if rule_type.search(/Monthly/) != -1
        @freq_select.prop('selectedIndex', 2)
        @initMonthlyOptions()
      else if rule_type.search(/Yearly/) != -1
        @freq_select.prop('selectedIndex', 3)
        @initYearlyOptions()
      else
        @initDailyOptions()
    @freq_select.on "change", @freqChanged.bind(this)

  initDailyOptions: ->
    section = @content.find('.daily_options')
    interval_input = section.find('.rs_daily_interval')
    interval_input.val(@current_rule.hash.interval)
    interval_input.on "change keyup", @intervalChanged.bind(this)
    section.show()

  initWeeklyOptions: ->
    section = @content.find('.weekly_options')

    # connect the interval field
    interval_input = section.find('.rs_weekly_interval')
    interval_input.val(@current_rule.hash.interval)
    interval_input.on "change keyup", @intervalChanged.bind(this)

    # clear selected days
    section.find(".day_holder a").each (index, element) ->
      $(element).removeClass("selected")

    # connect the day fields
    if @current_rule.hash.validations? && @current_rule.hash.validations.day?
      $(@current_rule.hash.validations.day).each (index, val) ->
        section.find(".day_holder a[data-value='"+val+"']").addClass("selected")

    section.off('click', '.day_holder a').on "click", ".day_holder a", @daysChanged.bind(this)

    section.show()

  initMonthlyOptions: ->
    section = @content.find('.monthly_options')
    interval_input = section.find('.rs_monthly_interval')
    interval_input.val(@current_rule.hash.interval)
    interval_input.on "change keyup", @intervalChanged.bind(this)

    @current_rule.hash.validations ||= {}
    @current_rule.hash.validations.day_of_month ||= []
    @current_rule.hash.validations.day_of_week ||= {}
    @init_calendar_days(section)
    @init_calendar_weeks(section)

    in_week_mode = Object.keys(@current_rule.hash.validations.day_of_week).length > 0
    section.find(".monthly_rule_type_week").prop("checked", in_week_mode)
    section.find(".monthly_rule_type_day").prop("checked", !in_week_mode)
    @toggle_month_view()
    section.find("input[name=monthly_rule_type]").on "change", @toggle_month_view.bind(this)
    section.show()

  initYearlyOptions: ->
    section = @content.find('.yearly_options')
    interval_input = section.find('.rs_yearly_interval')
    interval_input.val(@current_rule.hash.interval)
    interval_input.on "change keyup", @intervalChanged.bind(this)
    section.show()


  summaryInit: ->
    @summary = @outer_holder.find(".rs_summary")
    @summaryUpdate()

# ========================= render methods ===============================

  summaryUpdate: (new_string) =>
    @summary.width @content.width()
    if @current_rule.hash? && @current_rule.str?
      @summary.removeClass "fetching"
      @save_button.removeClass("disabled")
      rule_str = @current_rule.str.replace("*", "")
      if rule_str.length < 20
        rule_str = "#{@options.texts["summary"]}: "+rule_str
      @summary.find("span").html rule_str
    else
      @summary.addClass "fetching"
      @save_button.addClass("disabled")
      @summary.find("span").html ""
      @summaryFetch()

  summaryFetch: ->
    return if !(@current_rule.hash? && (rule_type = @current_rule.hash.rule_type)?)
    @current_rule.hash['week_start'] = @options.texts["first_day_of_week"]
    $.ajax
      url: "/recurring_select/translate/#{@options.texts["locale_iso_code"]}",
      type: "POST",
      data: @current_rule.hash
      success: @summaryFetchSuccess

  summaryFetchSuccess: (data) =>
    @current_rule.str = data
    @summaryUpdate()
    @content.css {"width": "auto"}

  init_calendar_days: (section) =>
    monthly_calendar = section.find(".rs_calendar_day")
    monthly_calendar.html ""
    for num in [1..31]
      monthly_calendar.append (day_link = $(document.createElement("a")).text(num))
      if $.inArray(num, @current_rule.hash.validations.day_of_month) != -1
        day_link.addClass("selected")

    # add last day of month button
    monthly_calendar.append (end_of_month_link = $(document.createElement("a")).text(@options.texts["last_day"]))
    end_of_month_link.addClass("end_of_month")
    if $.inArray(-1, @current_rule.hash.validations.day_of_month) != -1
      end_of_month_link.addClass("selected")

    monthly_calendar.find("a").on "click", @dateOfMonthChanged.bind(this)

  init_calendar_weeks: (section) =>
    monthly_calendar = section.find(".rs_calendar_week")
    monthly_calendar.html ""
    row_labels = @options.texts["order"]
    show_row = @options.monthly["show_week"]
    cell_str = @options.texts["days_first_letter"]

    for num, index in [1, 2, 3, 4, 5, -1]
      if show_row[index]
        monthly_calendar.append "<span>#{row_labels[num - 1]}</span>"
        for day_of_week in [@options.texts["first_day_of_week"]...(7 + @options.texts["first_day_of_week"])]
          day_of_week = day_of_week % 7
          day_link = $("<a>", {text: cell_str[day_of_week] })
          day_link.attr("day", day_of_week)
          day_link.attr("instance", num)
          monthly_calendar.append day_link

    $.each @current_rule.hash.validations.day_of_week, (key, value) ->
      $.each value, (index, instance) ->
        section.find("a[day='#{key}'][instance='#{instance}']").addClass("selected")
    monthly_calendar.find("a").on "click", @weekOfMonthChanged.bind(this)

  toggle_month_view: =>
    week_mode = @content.find(".monthly_rule_type_week").prop("checked")
    @content.find(".rs_calendar_week").toggle(week_mode)
    @content.find(".rs_calendar_day").toggle(!week_mode)

# ========================= Change callbacks ===============================

  freqChanged: =>
    @current_rule.hash = null unless $.isPlainObject(@current_rule.hash) # for custom values

    @current_rule.hash ||= {}
    @current_rule.hash.interval = 1
    @current_rule.hash.until = null
    @current_rule.hash.count = null
    @current_rule.hash.validations = null
    @content.find(".freq_option_section").hide();
    @content.find("input[type=radio], input[type=checkbox]").prop("checked", false)
    switch @freq_select.val()
      when "Weekly"
        @current_rule.hash.rule_type = "IceCube::WeeklyRule"
        @current_rule.str = @options.texts["weekly"]
        @initWeeklyOptions()
      when "Monthly"
        @current_rule.hash.rule_type = "IceCube::MonthlyRule"
        @current_rule.str = @options.texts["monthly"]
        @initMonthlyOptions()
      when "Yearly"
        @current_rule.hash.rule_type = "IceCube::YearlyRule"
        @current_rule.str = @options.texts["yearly"]
        @initYearlyOptions()
      else
        @current_rule.hash.rule_type = "IceCube::DailyRule"
        @current_rule.str = @options.texts["daily"]
        @initDailyOptions()
    @summaryUpdate()
    @positionDialogVert() unless @position == 'inline'

  intervalChanged: (event) =>
    @current_rule.str = null
    @current_rule.hash ||= {}
    @current_rule.hash.interval = parseInt($(event.currentTarget).val())
    if @current_rule.hash.interval < 1 || isNaN(@current_rule.hash.interval)
      @current_rule.hash.interval = 1
    @summaryUpdate()

  daysChanged: (event) =>
    $(event.currentTarget).toggleClass("selected")
    @current_rule.str = null
    @current_rule.hash ||= {}
    @current_rule.hash.validations = {}
    raw_days = @content.find(".day_holder a.selected").map -> parseInt($(this).data("value"))
    @current_rule.hash.validations.day = raw_days.get()
    @summaryUpdate()
    false # this prevents default and propogation

  dateOfMonthChanged: (event) =>
    $(event.currentTarget).toggleClass("selected")
    @current_rule.str = null
    @current_rule.hash ||= {}
    @current_rule.hash.validations = {}
    last_day_text = @options.texts["last_day"]
    raw_days = @content.find(".monthly_options .rs_calendar_day a.selected").map ->
      res = if $(this).text() == last_day_text then -1 else parseInt($(this).text())
      res
    @current_rule.hash.validations.day_of_week = {}
    @current_rule.hash.validations.day_of_month = raw_days.get()
    @summaryUpdate()
    false

  weekOfMonthChanged: (event) =>
    $(event.currentTarget).toggleClass("selected")
    @current_rule.str = null
    @current_rule.hash ||= {}
    @current_rule.hash.validations = {}
    @current_rule.hash.validations.day_of_month = []
    @current_rule.hash.validations.day_of_week = {}
    @content.find(".monthly_options .rs_calendar_week a.selected").each (index, elm) =>
      day = parseInt($(elm).attr("day"))
      instance = parseInt($(elm).attr("instance"))
      @current_rule.hash.validations.day_of_week[day] ||= []
      @current_rule.hash.validations.day_of_week[day].push instance
    @summaryUpdate()
    false

# ========================= Change callbacks ===============================

  template: () ->
    str = "
    <div class='rs_dialog_holder'>
      <div class='rs_dialog'>
        <div class='rs_dialog_content'>
          <h1>#{@options.texts["repeat"]} <a href='#' title='#{@options.texts["cancel"]}' Alt='#{@options.texts["cancel"]}'></a> </h1>
          <p class='frequency-select-wrapper'>
            <label for='rs_frequency'>#{@options.texts["frequency"]}:</label>
            <select data-wrapper-class='ui-recurring-select' id='rs_frequency' class='rs_frequency' name='rs_frequency'>
              <option value='Daily'>#{@options.texts["daily"]}</option>
              <option value='Weekly'>#{@options.texts["weekly"]}</option>
              <option value='Monthly'>#{@options.texts["monthly"]}</option>
              <option value='Yearly'>#{@options.texts["yearly"]}</option>
            </select>
          </p>

          <div class='daily_options freq_option_section'>
            <p>
              #{@options.texts["every"]}
              <input type='number' data-wrapper-class='ui-recurring-select' name='rs_daily_interval' class='rs_daily_interval rs_interval' value='1' size='2' />
              #{@options.texts["days"]}
            </p>
          </div>
          <div class='weekly_options freq_option_section'>
            <p>
              #{@options.texts["every"]}
              <input type='number' data-wrapper-class='ui-recurring-select' name='rs_weekly_interval' class='rs_weekly_interval rs_interval' value='1' size='2' />
              #{@options.texts["weeks_on"]}:
            </p>
            <div class='day_holder'>
    "
    for day_of_week in [@options.texts["first_day_of_week"]...(7 + @options.texts["first_day_of_week"])]
      day_of_week = day_of_week % 7
      str += "<a href='#' data-value='#{day_of_week}'>#{@options.texts["days_first_letter"][day_of_week]}</a>"

    str += "
            </div>
            <span style='clear:both; visibility:hidden; height:1px;'>.</span>
          </div>
          <div class='monthly_options freq_option_section'>
            <p>
              #{@options.texts["every"]}
              <input type='number' data-wrapper-class='ui-recurring-select' name='rs_monthly_interval' class='rs_monthly_interval rs_interval' value='1' size='2' />
              #{@options.texts["months"]}:
            </p>
            <p class='monthly_rule_type'>
              <span><label for='monthly_rule_type_day'>#{@options.texts["day_of_month"]}</label><input type='radio' class='monthly_rule_type_day' name='monthly_rule_type' id='monthly_rule_type_day' value='true' /></span>
              <span><label for='monthly_rule_type_week'>#{@options.texts["day_of_week"]}</label><input type='radio' class='monthly_rule_type_week' name='monthly_rule_type' id='monthly_rule_type_week' value='true' /></span>
            </p>
            <p class='rs_calendar_day'></p>
            <p class='rs_calendar_week'></p>
          </div>
          <div class='yearly_options freq_option_section'>
            <p>
              #{@options.texts["every"]}
              <input type='number' data-wrapper-class='ui-recurring-select' name='rs_yearly_interval' class='rs_yearly_interval rs_interval' value='1' size='2' />
              #{@options.texts["years"]}
            </p>
          </div>
          <p class='rs_summary'>
            <span></span>
          </p>
          <div class='controls'>
            <input type='button' data-wrapper-class='ui-recurring-select' class='rs_save' value='#{@options.texts["ok"]}' />
            <input type='button' data-wrapper-class='ui-recurring-select' class='rs_cancel' value='#{@options.texts["cancel"]}' />
          </div>
        </div>
      </div>
    </div>
    "
