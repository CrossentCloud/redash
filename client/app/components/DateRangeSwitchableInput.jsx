import { isArray } from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { clientConfig } from "@/services/auth";
import { Moment } from "@/components/proptypes";
import DatePicker from "antd/lib/date-picker";
import Select from "antd/lib/select"; // Select 컴포넌트 추가
import "antd/lib/date-picker/style/css"; // DatePicker 스타일을 불러옵니다.
import "antd/lib/select/style/css"; // Select 스타일을 불러옵니다.

const { RangePicker } = DatePicker;
const { Option } = Select; // Option 컴포넌트 추가

const DateRangeSwitchableInput = React.forwardRef(
  ({ defaultValue, value, onSelect, className, ...props }, ref) => {
    const [rangeType, setRangeType] = useState('day'); // Default to day range	

    const additionalAttributes = {};
    if (isArray(defaultValue) && defaultValue[0].isValid() && defaultValue[1].isValid()) {
      additionalAttributes.defaultValue = defaultValue;
      console.log('default value ' + additionalAttributes.defaultValue);
    } 

  
    if (value === null || (isArray(value) && value[0].isValid() && value[1].isValid())) {
      switch (rangeType) {
        case 'day':
          additionalAttributes.value = value;
          break;
        case 'month':
          additionalAttributes.value = [
            value ? value[0]?.startOf("month") : null,
            value ? value[1]?.endOf("month") : null,
          ];
          break;
        case 'year':
          additionalAttributes.value = [
            value ? value[0]?.startOf("year") : null,
            value ? value[1]?.endOf("year") : null,
          ];
          break;
      }
      console.log('value ' + additionalAttributes.value);
    }	  
	
    return (
      <div>
        {/* 옵션 선택 드롭다운 */}
        <Select value={rangeType} onChange={setRangeType} style={{ width: 100, marginRight: 10 }}>
          <Option value="day">Day</Option>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
        {/* RangePicker 컴포넌트 */}
        <RangePicker
          ref={ref}
          className={className}
	  {...additionalAttributes}
          onChange={onSelect}
          picker={rangeType} // 선택한 옵션에 따라 picker 값 변경
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
