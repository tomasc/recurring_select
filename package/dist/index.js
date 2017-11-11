(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define("@tomasc/hashtags", ["jquery"], factory);
	else if(typeof exports === 'object')
		exports["@tomasc/hashtags"] = factory(require("jquery"));
	else
		root["@tomasc/hashtags"] = factory(root["jquery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _recurring_select_dialog = __webpack_require__(3);

var _recurring_select_dialog2 = _interopRequireDefault(_recurring_select_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _methods;

// $ ->
//   $(document).on "focus", ".recurring_select", ->
//     $(this).recurring_select('set_initial_values')

//   $(document).on "change", ".recurring_select", ->
//     $(this).recurring_select('changed')
_methods = {
  set_initial_values: function set_initial_values() {
    this.data('initial-value-hash', this.val());
    return this.data('initial-value-str', $(this.find("option").get()[this.prop("selectedIndex")]).text());
  },
  changed: function changed() {
    if (this.val() === "custom") {
      return _methods.open_custom.apply(this);
    } else {
      return _methods.set_initial_values.apply(this);
    }
  },
  open_custom: function open_custom() {
    this.data("recurring-select-active", true);
    new _recurring_select_dialog2.default(this);
    return this.blur();
  },
  save: function save(new_rule) {
    var new_json_val;
    this.find("option[data-custom]").remove();
    new_json_val = JSON.stringify(new_rule.hash);
    // TODO: check for matching name, and replace that value if found
    if ($.inArray(new_json_val, this.find("option").map(function () {
      return $(this).val();
    })) === -1) {
      _methods.insert_option.apply(this, [new_rule.str, new_json_val]);
    }
    this.val(new_json_val);
    _methods.set_initial_values.apply(this);
    return this.trigger("recurring_select:save");
  },
  current_rule: function current_rule() {
    return {
      str: this.data("initial-value-str"),
      hash: $.parseJSON(this.data("initial-value-hash"))
    };
  },
  cancel: function cancel() {
    this.val(this.data("initial-value-hash"));
    this.data("recurring-select-active", false);
    return this.trigger("recurring_select:cancel");
  },
  insert_option: function insert_option(new_rule_str, new_rule_json) {
    var new_option, separator;
    separator = this.find("option:disabled");
    if (separator.length === 0) {
      separator = this.find("option");
    }
    separator = separator.last();
    new_option = $(document.createElement("option"));
    new_option.attr("data-custom", true);
    if (new_rule_str.substr(new_rule_str.length - 1) !== "*") {
      new_rule_str += "*";
    }
    new_option.text(new_rule_str);
    new_option.val(new_rule_json);
    return new_option.insertBefore(separator);
  },
  methods: function methods() {
    return _methods;
  }
};

$.fn.recurring_select = function (method) {
  if (method in _methods) {
    return _methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
  } else {
    return $.error('Method ' + method + ' does not exist on jQuery.recurring_select');
  }
};

$.fn.recurring_select.options = {
  monthly: {
    show_week: [true, true, true, true, false, false]
  }
};

$.fn.recurring_select.texts = {
  locale_iso_code: "en",
  repeat: "Repeat",
  last_day: "Last Day",
  frequency: "Frequency",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
  every: "Every",
  days: "day(s)",
  weeks_on: "week(s) on",
  months: "month(s)",
  years: "year(s)",
  day_of_month: "Day of month",
  day_of_week: "Day of week",
  cancel: "Cancel",
  ok: "OK",
  summary: "Summary",
  first_day_of_week: 0,
  days_first_letter: ["S", "M", "T", "W", "T", "F", "S"],
  order: ["1st", "2nd", "3rd", "4th", "5th", "Last"],
  show_week: [true, true, true, true, false, false]
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecurringSelectDialog;

exports.default = RecurringSelectDialog = function () {
  function RecurringSelectDialog(recurring_selector) {
    _classCallCheck(this, RecurringSelectDialog);

    this.positionDialogVert = this.positionDialogVert.bind(this);
    this.cancel = this.cancel.bind(this);
    this.outerCancel = this.outerCancel.bind(this);
    this.save = this.save.bind(this);
    // ========================= render methods ===============================
    this.summaryUpdate = this.summaryUpdate.bind(this);
    this.summaryFetchSuccess = this.summaryFetchSuccess.bind(this);
    this.init_calendar_days = this.init_calendar_days.bind(this);
    this.init_calendar_weeks = this.init_calendar_weeks.bind(this);
    this.toggle_month_view = this.toggle_month_view.bind(this);
    // ========================= Change callbacks ===============================
    this.freqChanged = this.freqChanged.bind(this);
    this.intervalChanged = this.intervalChanged.bind(this);
    this.daysChanged = this.daysChanged.bind(this);
    this.dateOfMonthChanged = this.dateOfMonthChanged.bind(this);
    this.weekOfMonthChanged = this.weekOfMonthChanged.bind(this);
    this.recurring_selector = recurring_selector;
    this.current_rule = this.recurring_selector.recurring_select('current_rule');
    this.position = this.recurring_selector.data('recurring-select-position');
    this.initDialogBox();
    if (this.current_rule.hash == null || this.current_rule.hash.rule_type == null) {
      this.freqChanged();
    } else if (this.position !== 'inline') {
      setTimeout(this.positionDialogVert, 10); // allow initial render
    }
  }

  _createClass(RecurringSelectDialog, [{
    key: 'initDialogBox',
    value: function initDialogBox() {
      var open_in;
      $(".rs_dialog_holder").remove();
      open_in = this.position === 'inline' ? this.recurring_selector.parent() : $("body");
      if ($(".ui-page-active").length) {
        open_in = $(".ui-page-active");
      }
      open_in.append(this.template());
      this.outer_holder = $(".rs_dialog_holder");
      this.outer_holder.addClass(this.position);
      this.inner_holder = this.outer_holder.find(".rs_dialog");
      this.content = this.outer_holder.find(".rs_dialog_content");
      if (this.position !== 'inline') {
        this.positionDialogVert(true);
      }
      this.mainEventInit();
      this.freqInit();
      this.summaryInit();
      this.outer_holder.trigger("recurring_select:dialog_opened");
      return this.freq_select.focus();
    }
  }, {
    key: 'positionDialogVert',
    value: function positionDialogVert(initial_positioning) {
      var _this = this;

      var dialog_height, margin_top, new_style_hash, window_height, window_width;
      window_height = $(window).height();
      window_width = $(window).width();
      dialog_height = this.content.outerHeight();
      if (dialog_height < 80) {
        dialog_height = 80;
      }
      margin_top = (window_height - dialog_height) / 2 - 30;
      if (margin_top < 10) {
        margin_top = 10;
      }
      // if dialog_height > window_height - 20
      //   dialog_height = window_height - 20
      new_style_hash = {
        "margin-top": margin_top + "px",
        "min-height": dialog_height + "px"
      };
      if (initial_positioning != null) {
        this.inner_holder.css(new_style_hash);
        return this.inner_holder.trigger("recurring_select:dialog_positioned");
      } else {
        this.inner_holder.addClass("animated");
        return this.inner_holder.animate(new_style_hash, 200, function () {
          _this.inner_holder.removeClass("animated");
          _this.content.css({
            "width": "auto"
          });
          return _this.inner_holder.trigger("recurring_select:dialog_positioned");
        });
      }
    }
  }, {
    key: 'cancel',
    value: function cancel(e) {
      if (e) {
        e.preventDefault();
      }
      this.outer_holder.remove();
      this.recurring_selector.recurring_select('cancel');
      return $('body').off('click.recurring_select_cancel');
    }
  }, {
    key: 'outerCancel',
    value: function outerCancel(event) {
      if ($(event.target).hasClass("rs_dialog_holder")) {
        return this.cancel();
      }
    }
  }, {
    key: 'save',
    value: function save() {
      if (this.current_rule.str == null) {
        return;
      }
      this.outer_holder.remove();
      this.recurring_selector.recurring_select('save', this.current_rule);
      return $('body').off('click.recurring_select_cancel');
    }

    // ========================= Init Methods ===============================

  }, {
    key: 'mainEventInit',
    value: function mainEventInit() {
      // Tap hooks are for jQueryMobile
      this.outer_holder.on('tap', this.outerCancel);
      this.content.on('tap', 'h1 a', this.cancel);
      this.save_button = this.content.find('input.rs_save').on("tap", this.save);
      return this.content.find('input.rs_cancel').on("tap", this.cancel);
    }
  }, {
    key: 'freqInit',
    value: function freqInit() {
      var rule_type;
      this.freq_select = this.outer_holder.find(".rs_frequency");
      if (this.current_rule.hash != null && (rule_type = this.current_rule.hash.rule_type) != null) {
        if (rule_type.search(/Weekly/) !== -1) {
          this.freq_select.prop('selectedIndex', 1);
          this.initWeeklyOptions();
        } else if (rule_type.search(/Monthly/) !== -1) {
          this.freq_select.prop('selectedIndex', 2);
          this.initMonthlyOptions();
        } else if (rule_type.search(/Yearly/) !== -1) {
          this.freq_select.prop('selectedIndex', 3);
          this.initYearlyOptions();
        } else {
          this.initDailyOptions();
        }
      }
      return this.freq_select.on("change", this.freqChanged);
    }
  }, {
    key: 'initDailyOptions',
    value: function initDailyOptions() {
      var interval_input, section;
      section = this.content.find('.daily_options');
      interval_input = section.find('.rs_daily_interval');
      interval_input.val(this.current_rule.hash.interval);
      interval_input.on("change keyup", this.intervalChanged);
      return section.show();
    }
  }, {
    key: 'initWeeklyOptions',
    value: function initWeeklyOptions() {
      var interval_input, section;
      section = this.content.find('.weekly_options');
      // connect the interval field
      interval_input = section.find('.rs_weekly_interval');
      interval_input.val(this.current_rule.hash.interval);
      interval_input.on("change keyup", this.intervalChanged);
      // clear selected days
      section.find(".day_holder a").each(function (index, element) {
        return $(element).removeClass("selected");
      });
      // connect the day fields
      if (this.current_rule.hash.validations != null && this.current_rule.hash.validations.day != null) {
        $(this.current_rule.hash.validations.day).each(function (index, val) {
          return section.find(".day_holder a[data-value='" + val + "']").addClass("selected");
        });
      }
      section.off('click', '.day_holder a').on("click", ".day_holder a", this.daysChanged);
      return section.show();
    }
  }, {
    key: 'initMonthlyOptions',
    value: function initMonthlyOptions() {
      var base, base1, base2, in_week_mode, interval_input, section;
      section = this.content.find('.monthly_options');
      interval_input = section.find('.rs_monthly_interval');
      interval_input.val(this.current_rule.hash.interval);
      interval_input.on("change keyup", this.intervalChanged);
      (base = this.current_rule.hash).validations || (base.validations = {});
      (base1 = this.current_rule.hash.validations).day_of_month || (base1.day_of_month = []);
      (base2 = this.current_rule.hash.validations).day_of_week || (base2.day_of_week = {});
      this.init_calendar_days(section);
      this.init_calendar_weeks(section);
      in_week_mode = Object.keys(this.current_rule.hash.validations.day_of_week).length > 0;
      section.find(".monthly_rule_type_week").prop("checked", in_week_mode);
      section.find(".monthly_rule_type_day").prop("checked", !in_week_mode);
      this.toggle_month_view();
      section.find("input[name=monthly_rule_type]").on("change", this.toggle_month_view);
      return section.show();
    }
  }, {
    key: 'initYearlyOptions',
    value: function initYearlyOptions() {
      var interval_input, section;
      section = this.content.find('.yearly_options');
      interval_input = section.find('.rs_yearly_interval');
      interval_input.val(this.current_rule.hash.interval);
      interval_input.on("change keyup", this.intervalChanged);
      return section.show();
    }
  }, {
    key: 'summaryInit',
    value: function summaryInit() {
      this.summary = this.outer_holder.find(".rs_summary");
      return this.summaryUpdate();
    }
  }, {
    key: 'summaryUpdate',
    value: function summaryUpdate(new_string) {
      var rule_str;
      this.summary.width(this.content.width());
      if (this.current_rule.hash != null && this.current_rule.str != null) {
        this.summary.removeClass("fetching");
        this.save_button.removeClass("disabled");
        rule_str = this.current_rule.str.replace("*", "");
        if (rule_str.length < 20) {
          rule_str = $.fn.recurring_select.texts["summary"] + ': ' + rule_str;
        }
        return this.summary.find("span").html(rule_str);
      } else {
        this.summary.addClass("fetching");
        this.save_button.addClass("disabled");
        this.summary.find("span").html("");
        return this.summaryFetch();
      }
    }
  }, {
    key: 'summaryFetch',
    value: function summaryFetch() {
      var rule_type;
      if (!(this.current_rule.hash != null && (rule_type = this.current_rule.hash.rule_type) != null)) {
        return;
      }
      this.current_rule.hash['week_start'] = $.fn.recurring_select.texts["first_day_of_week"];
      return $.ajax({
        url: '<%= Rails.application.config.action_controller.relative_url_root %>/recurring_select/translate/' + $.fn.recurring_select.texts["locale_iso_code"],
        type: "POST",
        data: this.current_rule.hash,
        success: this.summaryFetchSuccess
      });
    }
  }, {
    key: 'summaryFetchSuccess',
    value: function summaryFetchSuccess(data) {
      this.current_rule.str = data;
      this.summaryUpdate();
      return this.content.css({
        "width": "auto"
      });
    }
  }, {
    key: 'init_calendar_days',
    value: function init_calendar_days(section) {
      var day_link, end_of_month_link, i, monthly_calendar, num;
      monthly_calendar = section.find(".rs_calendar_day");
      monthly_calendar.html("");
      for (num = i = 1; i <= 31; num = ++i) {
        monthly_calendar.append(day_link = $(document.createElement("a")).text(num));
        if ($.inArray(num, this.current_rule.hash.validations.day_of_month) !== -1) {
          day_link.addClass("selected");
        }
      }
      // add last day of month button
      monthly_calendar.append(end_of_month_link = $(document.createElement("a")).text($.fn.recurring_select.texts["last_day"]));
      end_of_month_link.addClass("end_of_month");
      if ($.inArray(-1, this.current_rule.hash.validations.day_of_month) !== -1) {
        end_of_month_link.addClass("selected");
      }
      return monthly_calendar.find("a").on("tap", this.dateOfMonthChanged);
    }
  }, {
    key: 'init_calendar_weeks',
    value: function init_calendar_weeks(section) {
      var cell_str, day_link, day_of_week, i, index, j, len, monthly_calendar, num, ref, ref1, ref2, row_labels, show_row;
      monthly_calendar = section.find(".rs_calendar_week");
      monthly_calendar.html("");
      row_labels = $.fn.recurring_select.texts["order"];
      show_row = $.fn.recurring_select.options["monthly"]["show_week"];
      cell_str = $.fn.recurring_select.texts["days_first_letter"];
      ref = [1, 2, 3, 4, 5, -1];
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        num = ref[index];
        if (show_row[index]) {
          monthly_calendar.append('<span>' + row_labels[num - 1] + '</span>');
          for (day_of_week = j = ref1 = $.fn.recurring_select.texts["first_day_of_week"], ref2 = 7 + $.fn.recurring_select.texts["first_day_of_week"]; ref1 <= ref2 ? j < ref2 : j > ref2; day_of_week = ref1 <= ref2 ? ++j : --j) {
            day_of_week = day_of_week % 7;
            day_link = $("<a>", {
              text: cell_str[day_of_week]
            });
            day_link.attr("day", day_of_week);
            day_link.attr("instance", num);
            monthly_calendar.append(day_link);
          }
        }
      }
      $.each(this.current_rule.hash.validations.day_of_week, function (key, value) {
        return $.each(value, function (index, instance) {
          return section.find('a[day=\'' + key + '\'][instance=\'' + instance + '\']').addClass("selected");
        });
      });
      return monthly_calendar.find("a").on("tap", this.weekOfMonthChanged);
    }
  }, {
    key: 'toggle_month_view',
    value: function toggle_month_view() {
      var week_mode;
      week_mode = this.content.find(".monthly_rule_type_week").prop("checked");
      this.content.find(".rs_calendar_week").toggle(week_mode);
      return this.content.find(".rs_calendar_day").toggle(!week_mode);
    }
  }, {
    key: 'freqChanged',
    value: function freqChanged() {
      var base;
      if (!$.isPlainObject(this.current_rule.hash)) {
        // for custom values
        this.current_rule.hash = null;
      }
      (base = this.current_rule).hash || (base.hash = {});
      this.current_rule.hash.interval = 1;
      this.current_rule.hash.until = null;
      this.current_rule.hash.count = null;
      this.current_rule.hash.validations = null;
      this.content.find(".freq_option_section").hide();
      this.content.find("input[type=radio], input[type=checkbox]").prop("checked", false);
      switch (this.freq_select.val()) {
        case "Weekly":
          this.current_rule.hash.rule_type = "IceCube::WeeklyRule";
          this.current_rule.str = $.fn.recurring_select.texts["weekly"];
          this.initWeeklyOptions();
          break;
        case "Monthly":
          this.current_rule.hash.rule_type = "IceCube::MonthlyRule";
          this.current_rule.str = $.fn.recurring_select.texts["monthly"];
          this.initMonthlyOptions();
          break;
        case "Yearly":
          this.current_rule.hash.rule_type = "IceCube::YearlyRule";
          this.current_rule.str = $.fn.recurring_select.texts["yearly"];
          this.initYearlyOptions();
          break;
        default:
          this.current_rule.hash.rule_type = "IceCube::DailyRule";
          this.current_rule.str = $.fn.recurring_select.texts["daily"];
          this.initDailyOptions();
      }
      this.summaryUpdate();
      if (this.position !== 'inline') {
        return this.positionDialogVert();
      }
    }
  }, {
    key: 'intervalChanged',
    value: function intervalChanged(event) {
      var base;
      this.current_rule.str = null;
      (base = this.current_rule).hash || (base.hash = {});
      this.current_rule.hash.interval = parseInt($(event.currentTarget).val());
      if (this.current_rule.hash.interval < 1 || isNaN(this.current_rule.hash.interval)) {
        this.current_rule.hash.interval = 1;
      }
      return this.summaryUpdate();
    }
  }, {
    key: 'daysChanged',
    value: function daysChanged(event) {
      var base, raw_days;
      $(event.currentTarget).toggleClass("selected");
      this.current_rule.str = null;
      (base = this.current_rule).hash || (base.hash = {});
      this.current_rule.hash.validations = {};
      raw_days = this.content.find(".day_holder a.selected").map(function () {
        return parseInt($(this).data("value"));
      });
      this.current_rule.hash.validations.day = raw_days.get();
      this.summaryUpdate();
      return false; // this prevents default and propogation
    }
  }, {
    key: 'dateOfMonthChanged',
    value: function dateOfMonthChanged(event) {
      var base, raw_days;
      $(event.currentTarget).toggleClass("selected");
      this.current_rule.str = null;
      (base = this.current_rule).hash || (base.hash = {});
      this.current_rule.hash.validations = {};
      raw_days = this.content.find(".monthly_options .rs_calendar_day a.selected").map(function () {
        var res;
        res = $(this).text() === $.fn.recurring_select.texts["last_day"] ? -1 : parseInt($(this).text());
        return res;
      });
      this.current_rule.hash.validations.day_of_week = {};
      this.current_rule.hash.validations.day_of_month = raw_days.get();
      this.summaryUpdate();
      return false;
    }
  }, {
    key: 'weekOfMonthChanged',
    value: function weekOfMonthChanged(event) {
      var _this2 = this;

      var base;
      $(event.currentTarget).toggleClass("selected");
      this.current_rule.str = null;
      (base = this.current_rule).hash || (base.hash = {});
      this.current_rule.hash.validations = {};
      this.current_rule.hash.validations.day_of_month = [];
      this.current_rule.hash.validations.day_of_week = {};
      this.content.find(".monthly_options .rs_calendar_week a.selected").each(function (index, elm) {
        var base1, day, instance;
        day = parseInt($(elm).attr("day"));
        instance = parseInt($(elm).attr("instance"));
        (base1 = _this2.current_rule.hash.validations.day_of_week)[day] || (base1[day] = []);
        return _this2.current_rule.hash.validations.day_of_week[day].push(instance);
      });
      this.summaryUpdate();
      return false;
    }

    // ========================= Change callbacks ===============================

  }, {
    key: 'template',
    value: function template() {
      var day_of_week, i, ref, ref1, str;
      str = '<div class=\'rs_dialog_holder\'> <div class=\'rs_dialog\'> <div class=\'rs_dialog_content\'> <h1>' + $.fn.recurring_select.texts["repeat"] + ' <a href=\'#\' title=\'' + $.fn.recurring_select.texts["cancel"] + '\' Alt=\'' + $.fn.recurring_select.texts["cancel"] + '\'></a> </h1> <p class=\'frequency-select-wrapper\'> <label for=\'rs_frequency\'>' + $.fn.recurring_select.texts["frequency"] + ':</label> <select data-wrapper-class=\'ui-recurring-select\' id=\'rs_frequency\' class=\'rs_frequency\' name=\'rs_frequency\'> <option value=\'Daily\'>' + $.fn.recurring_select.texts["daily"] + '</option> <option value=\'Weekly\'>' + $.fn.recurring_select.texts["weekly"] + '</option> <option value=\'Monthly\'>' + $.fn.recurring_select.texts["monthly"] + '</option> <option value=\'Yearly\'>' + $.fn.recurring_select.texts["yearly"] + '</option> </select> </p> <div class=\'daily_options freq_option_section\'> <p> ' + $.fn.recurring_select.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_daily_interval\' class=\'rs_daily_interval rs_interval\' value=\'1\' size=\'2\' /> ' + $.fn.recurring_select.texts["days"] + ' </p> </div> <div class=\'weekly_options freq_option_section\'> <p> ' + $.fn.recurring_select.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_weekly_interval\' class=\'rs_weekly_interval rs_interval\' value=\'1\' size=\'2\' /> ' + $.fn.recurring_select.texts["weeks_on"] + ': </p> <div class=\'day_holder\'>';
      for (day_of_week = i = ref = $.fn.recurring_select.texts["first_day_of_week"], ref1 = 7 + $.fn.recurring_select.texts["first_day_of_week"]; ref <= ref1 ? i < ref1 : i > ref1; day_of_week = ref <= ref1 ? ++i : --i) {
        day_of_week = day_of_week % 7;
        str += '<a href=\'#\' data-value=\'' + day_of_week + '\'>' + $.fn.recurring_select.texts["days_first_letter"][day_of_week] + '</a>';
      }
      return str += '</div> <span style=\'clear:both; visibility:hidden; height:1px;\'>.</span> </div> <div class=\'monthly_options freq_option_section\'> <p> ' + $.fn.recurring_select.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_monthly_interval\' class=\'rs_monthly_interval rs_interval\' value=\'1\' size=\'2\' /> ' + $.fn.recurring_select.texts["months"] + ': </p> <p class=\'monthly_rule_type\'> <span><label for=\'monthly_rule_type_day\'>' + $.fn.recurring_select.texts["day_of_month"] + '</label><input type=\'radio\' class=\'monthly_rule_type_day\' name=\'monthly_rule_type\' id=\'monthly_rule_type_day\' value=\'true\' /></span> <span><label for=\'monthly_rule_type_week\'>' + $.fn.recurring_select.texts["day_of_week"] + '</label><input type=\'radio\' class=\'monthly_rule_type_week\' name=\'monthly_rule_type\' id=\'monthly_rule_type_week\' value=\'true\' /></span> </p> <p class=\'rs_calendar_day\'></p> <p class=\'rs_calendar_week\'></p> </div> <div class=\'yearly_options freq_option_section\'> <p> ' + $.fn.recurring_select.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_yearly_interval\' class=\'rs_yearly_interval rs_interval\' value=\'1\' size=\'2\' /> ' + $.fn.recurring_select.texts["years"] + ' </p> </div> <p class=\'rs_summary\'> <span></span> </p> <div class=\'controls\'> <input type=\'button\' data-wrapper-class=\'ui-recurring-select\' class=\'rs_save\' value=\'' + $.fn.recurring_select.texts["ok"] + '\' /> <input type=\'button\' data-wrapper-class=\'ui-recurring-select\' class=\'rs_cancel\' value=\'' + $.fn.recurring_select.texts["cancel"] + '\' /> </div> </div> </div> </div>';
    }
  }]);

  return RecurringSelectDialog;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
});