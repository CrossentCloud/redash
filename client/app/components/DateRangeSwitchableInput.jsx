import { has, isArray } from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Moment } from "@/components/proptypes";
import DatePicker from "antd/lib/date-picker";
import Select from "antd/lib/select"; 
import "antd/lib/date-picker/style/css"; 
import "antd/lib/select/style/css"; 
import location from "@/services/location";
import qs from "query-string";

const { RangePicker } = DatePicker;
const { Option } = Select; 

const DateRangeSwitchableInput = React.forwardRef(
  ({ defaultValue, value, onSelect, className, ...props }, ref) => {

    const additionalAttributes = {};
    if (isArray(defaultValue) && defaultValue[0].isValid() && defaultValue[1].isValid()) {
      additionalAttributes.defaultValue = defaultValue;
    } 

    if (value === null || (isArray(value) && value[0].isValid() && value[1].isValid())) {
      additionalAttributes.value = value;
    }	  


    //const full_options = ["day", "week", "month", "quarter", "year"];
    const full_options = ["day", "week", "month", "year"]; 
    const optionLabels = {
      day: "일",
      week: "주",
      month: "월",
      quarter: "분기",
      year: "년",
    };

    //const datetypeExist = has(location.search, "datetype");
    //console.log('********* datetype = ' + datetypeExist)

    const currentUrlParams = qs.parse(window.location.search.substring(1)); 
    //console.log('********* params = ' + qs.stringify(currentUrlParams));

    const datetype = currentUrlParams['p_datetype'];
    //console.log('********* datetype = ' + datetype)

    let options;
    let default_option; 
    if (datetype && full_options.includes(datetype)) {
        options = [datetype];
        default_option = datetype; 
    } else {
	options = [...full_options];
        default_option = 'day'
    }

    const [pickerType, setPickerType] = useState(default_option);
    const handlePickerTypeChange = (newPickerType) => {
      setPickerType(newPickerType); 
    };
	  
    return (
      <div>
	<Select value={pickerType} onChange={handlePickerTypeChange} style={{ width: 100, marginRight: 10 }}>
  	  {options.map(optionValue => (
    	    <Option key={optionValue} value={optionValue}>
	     {optionLabels[optionValue]}
            </Option> )
	  )}
        </Select>
        <RangePicker
          ref={ref}
          className={className}
	  {...additionalAttributes}
	  onChange={(newDates) => onSelect(newDates, pickerType)}
          picker={pickerType} 
          {...props}
        />
      </div>
    );
  }
);

DateRangeSwitchableInput.propTypes = {
  defaultValue: PropTypes.arrayOf(Moment),
  value: PropTypes.arrayOf(Moment),
  onSelect: PropTypes.func,
  className: PropTypes.string,
};

DateRangeSwitchableInput.defaultProps = {
  defaultValue: null,
  value: undefined,
  onSelect: () => {},
  className: "",
};

export default DateRangeSwitchableInput;
