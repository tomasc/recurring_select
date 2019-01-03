(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define("@tomasc/recurring-select", ["jquery"], factory);
	else if(typeof exports === 'object')
		exports["@tomasc/recurring-select"] = factory(require("jquery"));
	else
		root["@tomasc/recurring-select"] = factory(root["jquery"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin;

exports.default = Plugin = function () {
  _createClass(Plugin, null, [{
    key: "register",
    value: function register() {
      var defaults, klass, name, options, ref, ref1, selector;
      klass = this;
      defaults = (ref = this.defaults) != null ? ref : {};
      name = defaults.name || (defaults.name = /function ([^(]*)/.exec(klass + "")[1]);
      options = Array.prototype.slice.call(arguments).slice(1);
      selector = (ref1 = arguments[0]) != null ? ref1 : klass.selector;
      return this.init_plugin(klass, name);
    }
  }, {
    key: "init_plugin",
    value: function init_plugin(klass, name) {
      if ($.fn[name] !== void 0) {
        return;
      }
      return $.fn[name] = function (options) {
        var args, dataKey, returns;
        args = arguments;
        dataKey = "plugin_" + name;
        if (options === undefined || (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
          return this.each(function () {
            var instance;
            this.pluginInstances || (this.pluginInstances = {});
            if (!this.pluginInstances[dataKey]) {
              instance = new klass(this, options);
              return this.pluginInstances[dataKey] = instance;
            }
          });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
          returns = void 0;
          this.each(function () {
            var instance;
            this.pluginInstances || (this.pluginInstances = {});
            instance = this.pluginInstances[dataKey];
            if (instance instanceof klass && typeof instance[options] === 'function') {
              returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            }
            if (options === 'destroy') {
              return this.pluginInstances[dataKey] = null;
            }
          });
          if (returns !== undefined) {
            return returns;
          } else {
            return this;
          }
        }
      };
    }
  }]);

  function Plugin(element, options) {
    _classCallCheck(this, Plugin);

    this.element = element;
    this.options = $.extend({}, this.constructor.defaults, options);
    this.$element = $(this.element);
    this.init();
  }

  return Plugin;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_assets_stylesheets_recurring_select_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_assets_stylesheets_recurring_select_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_assets_stylesheets_recurring_select_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_assets_stylesheets_jquery_mobile_rs_overrides_scss__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_assets_stylesheets_jquery_mobile_rs_overrides_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__app_assets_stylesheets_jquery_mobile_rs_overrides_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recurring_select__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recurring_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__recurring_select__);




/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_2__recurring_select___default.a);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recurring_select_dialog = __webpack_require__(6);

var _recurring_select_dialog2 = _interopRequireDefault(_recurring_select_dialog);

var _plugin = __webpack_require__(1);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecurringSelect;

exports.default = RecurringSelect = function () {
  var RecurringSelect = function (_Plugin) {
    _inherits(RecurringSelect, _Plugin);

    function RecurringSelect() {
      _classCallCheck(this, RecurringSelect);

      return _possibleConstructorReturn(this, (RecurringSelect.__proto__ || Object.getPrototypeOf(RecurringSelect)).apply(this, arguments));
    }

    _createClass(RecurringSelect, [{
      key: 'init',
      value: function init() {}
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this.dialog_instance) {
          this.dialog_instance.destroy();
        }
        return this.dialog_instance = void 0;
      }
    }, {
      key: 'get_data',
      value: function get_data(name) {
        return this.$element.data(name);
      }
    }, {
      key: 'set_initial_values',
      value: function set_initial_values() {
        this.$element.data('initial-value-hash', this.$element.val());
        return this.$element.data('initial-value-str', $(this.$element.find("option").get()[this.$element.prop("selectedIndex")]).text());
      }
    }, {
      key: 'changed',
      value: function changed() {
        if (this.$element.val() === "custom") {
          return this.open_custom();
        } else {
          return this.set_initial_values();
        }
      }
    }, {
      key: 'open_custom',
      value: function open_custom() {
        this.$element.data("recurring-select-active", true);
        this.dialog_instance = new _recurring_select_dialog2.default(this.element, {
          input_instance: this
        });
        return this.$element.blur();
      }
    }, {
      key: 'save',
      value: function save(new_rule) {
        var new_json_val;
        this.$element.find("option[data-custom]").remove();
        new_json_val = JSON.stringify(new_rule.hash);
        // TODO: check for matching name, and replace that value if found
        if ($.inArray(new_json_val, this.$element.find("option").map(function (el) {
          return $(this).val();
        })) === -1) {
          this.insert_option(new_rule.str, new_json_val);
        }
        this.$element.val(new_json_val);
        this.set_initial_values();
        return this.$element.trigger("recurring_select:save");
      }
    }, {
      key: 'current_rule',
      value: function current_rule() {
        return {
          str: this.$element.data("initial-value-str"),
          hash: $.parseJSON(this.$element.data("initial-value-hash"))
        };
      }
    }, {
      key: 'cancel',
      value: function cancel() {
        this.$element.val(this.$element.data("initial-value-hash"));
        this.$element.data("recurring-select-active", false);
        return this.$element.trigger("recurring_select:cancel");
      }
    }, {
      key: 'insert_option',
      value: function insert_option(new_rule_str, new_rule_json) {
        var new_option, separator;
        separator = this.$element.find("option:disabled");
        if (separator.length === 0) {
          separator = this.$element.find("option");
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
      }
    }]);

    return RecurringSelect;
  }(_plugin2.default);

  ;

  RecurringSelect.defaults = {
    debug: false
  };

  return RecurringSelect;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = __webpack_require__(1);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecurringSelectDialog,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

exports.default = RecurringSelectDialog = function () {
  var RecurringSelectDialog = function (_Plugin) {
    _inherits(RecurringSelectDialog, _Plugin);

    function RecurringSelectDialog() {
      _classCallCheck(this, RecurringSelectDialog);

      var _this = _possibleConstructorReturn(this, (RecurringSelectDialog.__proto__ || Object.getPrototypeOf(RecurringSelectDialog)).apply(this, arguments));

      _this.positionDialogVert = _this.positionDialogVert.bind(_this);
      _this.cancel = _this.cancel.bind(_this);
      _this.outerCancel = _this.outerCancel.bind(_this);
      _this.save = _this.save.bind(_this);
      // ========================= render methods ===============================
      _this.summaryUpdate = _this.summaryUpdate.bind(_this);
      _this.summaryFetchSuccess = _this.summaryFetchSuccess.bind(_this);
      _this.init_calendar_days = _this.init_calendar_days.bind(_this);
      _this.init_calendar_weeks = _this.init_calendar_weeks.bind(_this);
      _this.toggle_month_view = _this.toggle_month_view.bind(_this);
      // ========================= Change callbacks ===============================
      _this.freqChanged = _this.freqChanged.bind(_this);
      _this.intervalChanged = _this.intervalChanged.bind(_this);
      _this.daysChanged = _this.daysChanged.bind(_this);
      _this.dateOfMonthChanged = _this.dateOfMonthChanged.bind(_this);
      _this.weekOfMonthChanged = _this.weekOfMonthChanged.bind(_this);
      return _this;
    }

    _createClass(RecurringSelectDialog, [{
      key: 'init',
      value: function init() {
        this.current_rule = this.options.input_instance.current_rule();
        this.position = this.options.input_instance.get_data('recurring-select-position');
        this.initDialogBox();
        if (this.current_rule.hash == null || this.current_rule.hash.rule_type == null) {
          return this.freqChanged();
        } else if (this.position !== 'inline') {
          return setTimeout(this.positionDialogVert, 10); // allow initial render
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {}
    }, {
      key: 'initDialogBox',
      value: function initDialogBox() {
        var open_in;
        $(".rs_dialog_holder").remove();
        open_in = this.position === 'inline' ? this.$element.parent() : $("body");
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
        var _this2 = this;

        var dialog_height, margin_top, new_style_hash, window_height, window_width;
        boundMethodCheck(this, RecurringSelectDialog);
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
            _this2.inner_holder.removeClass("animated");
            _this2.content.css({
              "width": "auto"
            });
            return _this2.inner_holder.trigger("recurring_select:dialog_positioned");
          });
        }
      }
    }, {
      key: 'cancel',
      value: function cancel(e) {
        boundMethodCheck(this, RecurringSelectDialog);
        if (e) {
          e.preventDefault();
        }
        this.outer_holder.remove();
        this.options.input_instance.cancel();
        return $('body').off('click.recurring_select_cancel');
      }
    }, {
      key: 'outerCancel',
      value: function outerCancel(event) {
        boundMethodCheck(this, RecurringSelectDialog);
        if ($(event.target).hasClass("rs_dialog_holder")) {
          return this.cancel();
        }
      }
    }, {
      key: 'save',
      value: function save() {
        boundMethodCheck(this, RecurringSelectDialog);
        if (this.current_rule.str == null) {
          return;
        }
        this.outer_holder.remove();
        this.options.input_instance.save(this.current_rule);
        return $('body').off('click.recurring_select_cancel');
      }

      // ========================= Init Methods ===============================

    }, {
      key: 'mainEventInit',
      value: function mainEventInit() {
        // Tap hooks are for jQueryMobile
        this.outer_holder.on('click', this.outerCancel.bind(this));
        this.content.on('click', 'h1 a', this.cancel.bind(this));
        this.save_button = this.content.find('input.rs_save').on("click", this.save.bind(this));
        return this.content.find('input.rs_cancel').on("click", this.cancel.bind(this));
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
        return this.freq_select.on("change", this.freqChanged.bind(this));
      }
    }, {
      key: 'initDailyOptions',
      value: function initDailyOptions() {
        var interval_input, section;
        section = this.content.find('.daily_options');
        interval_input = section.find('.rs_daily_interval');
        interval_input.val(this.current_rule.hash.interval);
        interval_input.on("change keyup", this.intervalChanged.bind(this));
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
        interval_input.on("change keyup", this.intervalChanged.bind(this));
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
        section.off('click', '.day_holder a').on("click", ".day_holder a", this.daysChanged.bind(this));
        return section.show();
      }
    }, {
      key: 'initMonthlyOptions',
      value: function initMonthlyOptions() {
        var base, base1, base2, in_week_mode, interval_input, section;
        section = this.content.find('.monthly_options');
        interval_input = section.find('.rs_monthly_interval');
        interval_input.val(this.current_rule.hash.interval);
        interval_input.on("change keyup", this.intervalChanged.bind(this));
        (base = this.current_rule.hash).validations || (base.validations = {});
        (base1 = this.current_rule.hash.validations).day_of_month || (base1.day_of_month = []);
        (base2 = this.current_rule.hash.validations).day_of_week || (base2.day_of_week = {});
        this.init_calendar_days(section);
        this.init_calendar_weeks(section);
        in_week_mode = Object.keys(this.current_rule.hash.validations.day_of_week).length > 0;
        section.find(".monthly_rule_type_week").prop("checked", in_week_mode);
        section.find(".monthly_rule_type_day").prop("checked", !in_week_mode);
        this.toggle_month_view();
        section.find("input[name=monthly_rule_type]").on("change", this.toggle_month_view.bind(this));
        return section.show();
      }
    }, {
      key: 'initYearlyOptions',
      value: function initYearlyOptions() {
        var interval_input, section;
        section = this.content.find('.yearly_options');
        interval_input = section.find('.rs_yearly_interval');
        interval_input.val(this.current_rule.hash.interval);
        interval_input.on("change keyup", this.intervalChanged.bind(this));
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
        boundMethodCheck(this, RecurringSelectDialog);
        this.summary.width(this.content.width());
        if (this.current_rule.hash != null && this.current_rule.str != null) {
          this.summary.removeClass("fetching");
          this.save_button.removeClass("disabled");
          rule_str = this.current_rule.str.replace("*", "");
          if (rule_str.length < 20) {
            rule_str = this.options.texts["summary"] + ': ' + rule_str;
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
        this.current_rule.hash['week_start'] = this.options.texts["first_day_of_week"];
        return $.ajax({
          url: '/recurring_select/translate/' + this.options.texts["locale_iso_code"],
          type: "POST",
          data: this.current_rule.hash,
          success: this.summaryFetchSuccess
        });
      }
    }, {
      key: 'summaryFetchSuccess',
      value: function summaryFetchSuccess(data) {
        boundMethodCheck(this, RecurringSelectDialog);
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
        boundMethodCheck(this, RecurringSelectDialog);
        monthly_calendar = section.find(".rs_calendar_day");
        monthly_calendar.html("");
        for (num = i = 1; i <= 31; num = ++i) {
          monthly_calendar.append(day_link = $(document.createElement("a")).text(num));
          if ($.inArray(num, this.current_rule.hash.validations.day_of_month) !== -1) {
            day_link.addClass("selected");
          }
        }
        // add last day of month button
        monthly_calendar.append(end_of_month_link = $(document.createElement("a")).text(this.options.texts["last_day"]));
        end_of_month_link.addClass("end_of_month");
        if ($.inArray(-1, this.current_rule.hash.validations.day_of_month) !== -1) {
          end_of_month_link.addClass("selected");
        }
        return monthly_calendar.find("a").on("click", this.dateOfMonthChanged.bind(this));
      }
    }, {
      key: 'init_calendar_weeks',
      value: function init_calendar_weeks(section) {
        var cell_str, day_link, day_of_week, i, index, j, len, monthly_calendar, num, ref, ref1, ref2, row_labels, show_row;
        boundMethodCheck(this, RecurringSelectDialog);
        monthly_calendar = section.find(".rs_calendar_week");
        monthly_calendar.html("");
        row_labels = this.options.texts["order"];
        show_row = this.options.monthly["show_week"];
        cell_str = this.options.texts["days_first_letter"];
        ref = [1, 2, 3, 4, 5, -1];
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          num = ref[index];
          if (show_row[index]) {
            monthly_calendar.append('<span>' + row_labels[num - 1] + '</span>');
            for (day_of_week = j = ref1 = this.options.texts["first_day_of_week"], ref2 = 7 + this.options.texts["first_day_of_week"]; ref1 <= ref2 ? j < ref2 : j > ref2; day_of_week = ref1 <= ref2 ? ++j : --j) {
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
        return monthly_calendar.find("a").on("click", this.weekOfMonthChanged.bind(this));
      }
    }, {
      key: 'toggle_month_view',
      value: function toggle_month_view() {
        var week_mode;
        boundMethodCheck(this, RecurringSelectDialog);
        week_mode = this.content.find(".monthly_rule_type_week").prop("checked");
        this.content.find(".rs_calendar_week").toggle(week_mode);
        return this.content.find(".rs_calendar_day").toggle(!week_mode);
      }
    }, {
      key: 'freqChanged',
      value: function freqChanged() {
        var base;
        boundMethodCheck(this, RecurringSelectDialog);
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
            this.current_rule.str = this.options.texts["weekly"];
            this.initWeeklyOptions();
            break;
          case "Monthly":
            this.current_rule.hash.rule_type = "IceCube::MonthlyRule";
            this.current_rule.str = this.options.texts["monthly"];
            this.initMonthlyOptions();
            break;
          case "Yearly":
            this.current_rule.hash.rule_type = "IceCube::YearlyRule";
            this.current_rule.str = this.options.texts["yearly"];
            this.initYearlyOptions();
            break;
          default:
            this.current_rule.hash.rule_type = "IceCube::DailyRule";
            this.current_rule.str = this.options.texts["daily"];
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
        boundMethodCheck(this, RecurringSelectDialog);
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
        boundMethodCheck(this, RecurringSelectDialog);
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
        var base, last_day_text, raw_days;
        boundMethodCheck(this, RecurringSelectDialog);
        $(event.currentTarget).toggleClass("selected");
        this.current_rule.str = null;
        (base = this.current_rule).hash || (base.hash = {});
        this.current_rule.hash.validations = {};
        last_day_text = this.options.texts["last_day"];
        raw_days = this.content.find(".monthly_options .rs_calendar_day a.selected").map(function () {
          var res;
          res = $(this).text() === last_day_text ? -1 : parseInt($(this).text());
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
        var _this3 = this;

        var base;
        boundMethodCheck(this, RecurringSelectDialog);
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
          (base1 = _this3.current_rule.hash.validations.day_of_week)[day] || (base1[day] = []);
          return _this3.current_rule.hash.validations.day_of_week[day].push(instance);
        });
        this.summaryUpdate();
        return false;
      }

      // ========================= Change callbacks ===============================

    }, {
      key: 'template',
      value: function template() {
        var day_of_week, i, ref, ref1, str;
        str = '<div class=\'rs_dialog_holder\'> <div class=\'rs_dialog\'> <div class=\'rs_dialog_content\'> <h1>' + this.options.texts["repeat"] + ' <a href=\'#\' title=\'' + this.options.texts["cancel"] + '\' Alt=\'' + this.options.texts["cancel"] + '\'></a> </h1> <p class=\'frequency-select-wrapper\'> <label for=\'rs_frequency\'>' + this.options.texts["frequency"] + ':</label> <select data-wrapper-class=\'ui-recurring-select\' id=\'rs_frequency\' class=\'rs_frequency\' name=\'rs_frequency\'> <option value=\'Daily\'>' + this.options.texts["daily"] + '</option> <option value=\'Weekly\'>' + this.options.texts["weekly"] + '</option> <option value=\'Monthly\'>' + this.options.texts["monthly"] + '</option> <option value=\'Yearly\'>' + this.options.texts["yearly"] + '</option> </select> </p> <div class=\'daily_options freq_option_section\'> <p> ' + this.options.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_daily_interval\' class=\'rs_daily_interval rs_interval\' value=\'1\' size=\'2\' /> ' + this.options.texts["days"] + ' </p> </div> <div class=\'weekly_options freq_option_section\'> <p> ' + this.options.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_weekly_interval\' class=\'rs_weekly_interval rs_interval\' value=\'1\' size=\'2\' /> ' + this.options.texts["weeks_on"] + ': </p> <div class=\'day_holder\'>';
        for (day_of_week = i = ref = this.options.texts["first_day_of_week"], ref1 = 7 + this.options.texts["first_day_of_week"]; ref <= ref1 ? i < ref1 : i > ref1; day_of_week = ref <= ref1 ? ++i : --i) {
          day_of_week = day_of_week % 7;
          str += '<a href=\'#\' data-value=\'' + day_of_week + '\'>' + this.options.texts["days_first_letter"][day_of_week] + '</a>';
        }
        return str += '</div> <span style=\'clear:both; visibility:hidden; height:1px;\'>.</span> </div> <div class=\'monthly_options freq_option_section\'> <p> ' + this.options.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_monthly_interval\' class=\'rs_monthly_interval rs_interval\' value=\'1\' size=\'2\' /> ' + this.options.texts["months"] + ': </p> <p class=\'monthly_rule_type\'> <span><label for=\'monthly_rule_type_day\'>' + this.options.texts["day_of_month"] + '</label><input type=\'radio\' class=\'monthly_rule_type_day\' name=\'monthly_rule_type\' id=\'monthly_rule_type_day\' value=\'true\' /></span> <span><label for=\'monthly_rule_type_week\'>' + this.options.texts["day_of_week"] + '</label><input type=\'radio\' class=\'monthly_rule_type_week\' name=\'monthly_rule_type\' id=\'monthly_rule_type_week\' value=\'true\' /></span> </p> <p class=\'rs_calendar_day\'></p> <p class=\'rs_calendar_week\'></p> </div> <div class=\'yearly_options freq_option_section\'> <p> ' + this.options.texts["every"] + ' <input type=\'number\' data-wrapper-class=\'ui-recurring-select\' name=\'rs_yearly_interval\' class=\'rs_yearly_interval rs_interval\' value=\'1\' size=\'2\' /> ' + this.options.texts["years"] + ' </p> </div> <p class=\'rs_summary\'> <span></span> </p> <div class=\'controls\'> <input type=\'button\' data-wrapper-class=\'ui-recurring-select\' class=\'rs_save\' value=\'' + this.options.texts["ok"] + '\' /> <input type=\'button\' data-wrapper-class=\'ui-recurring-select\' class=\'rs_cancel\' value=\'' + this.options.texts["cancel"] + '\' /> </div> </div> </div> </div>';
      }
    }]);

    return RecurringSelectDialog;
  }(_plugin2.default);

  ;

  RecurringSelectDialog.defaults = {
    debug: false,
    name: 'recurring_select_dialog',
    monthly: {
      show_week: [true, true, true, true, false, false]
    },
    texts: {
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
    }
  };

  return RecurringSelectDialog;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
});