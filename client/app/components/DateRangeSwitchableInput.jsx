import { isArray } from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Moment } from "@/components/proptypes";
import DatePicker from "antd/lib/date-picker";
import Select from "antd/lib/select"; 
import "antd/lib/date-picker/style/css"; 
import "antd/lib/select/style/css"; 

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

    const [pickerType, setPickerType] = useState('day');
    const handlePickerTypeChange = (newPickerType) => {
      setPickerType(newPickerType); 
    };
	  
    return (
      <div>
        <Select value={pickerType} onChange={handlePickerTypeChange} style={{ width: 100, marginRight: 10 }}>
          <Option value="day">Day</Option>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
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
