import React, {PropTypes} from "react";
import Datetime from 'react-datetime'
import InputElement from 'react-input-mask'
import moment from 'moment'
import 'moment/locale/ru'
import 'react-datetime/css/react-datetime.css'
import { formatDateCustom } from '../../utils'

export const formatDate = formatDateCustom('DD.MM.YYYY HH:mm')

const validateDates = (availableDates) => (current) => {
  if (availableDates === 'future') {
    const yesterday = Datetime.moment().subtract(1, 'day')
    return current.isAfter(yesterday)
  }
  if (availableDates === 'past') {
    return moment(current).isBefore()
  }
  return true
}

class DateTimeInputWidget extends React.Component {
  renderInput = (props, openCalendar) => {
    const {
      id,
      value,
      onChange,
      onBlur,
      placeholder,
      options: {
        dateTimeWidgetType,
      },
      formContext,
    } = this.props;

//    console.log('renderInput value:', value)
    const [date = '', time = ''] = value ? value.split(' ') : []
    const [day = '', month = '', year = ''] = date ? date.split('.') : []
    let D
    let format
    if (day.startsWith('3')) {
      D = '[01]'
    } else if (day.startsWith('0')) {
      D = '[1-9]'
    } else {
      D = '[0-9]'
    }
//    console.log('D', D)

    let M
    if (month.startsWith('1')) {
      M = '[0-2]'
    } else if (month.startsWith('0')) {
      M = '[1-9]'
    } else {
      M = '[0-9]'
    }

    let defaultPlaceholder
    let mask
    if (!dateTimeWidgetType || dateTimeWidgetType === 'dateTime') {
      defaultPlaceholder =  'ДД.ММ.ГГГГ чч:мм'
      mask = 'dD.mM.y999 12:39'
      format = 'DD.MM.YYYY HH:mm'
    } else if (dateTimeWidgetType === 'date') {
      defaultPlaceholder = 'ДД.ММ.ГГГГ'
      mask = 'dD.mM.y999'
      format = 'DD.MM.YYYY'
    } else if (dateTimeWidgetType === 'time') {
      defaultPlaceholder = 'ЧЧ:ММ'
      mask = '12:39'
      format = 'HH:mm'
    }

//    console.log('mask', mask)
    const { cssPrefix } = formContext
//    console.log('input value:', value)
    return (
      <InputElement
        mask={mask}
        maskChar='_'
        placeholder={placeholder || defaultPlaceholder}
        className={formContext && formContext.preview
          ? 'ant-input ant-input-lg'
          : `${cssPrefix}__form-control`
        }
        onChange={event => {
          onChange(event.target.value)
        }}
        onBlur={onBlur && (({ target: { value } }) => {
          if (/\d/.test(value)) {
            formContext.setDirty(id)
            onChange(value)
          } else {
            onChange(undefined)
          }
        })}
        onFocus={(a) => {
//          console.log('focus on input', a)
          formContext.setTouched(id)
        }}
        onClick={openCalendar}
        value={value || ''}
        formatChars={{
          '9': '[0-9]',
          'd': '[0-3]',
          'D': D,
          'm': '[01]',
          'M': M,
          'y': '[12]',
          '1': '[0-2]',
          '2': time.startsWith('2') ? '[0-3]' : '[0-9]',
          '3': '[0-5]',
        }}
      />
    )
  }

  render() {
    const {
      id,
      value,
      readonly,
      autofocus,
      onChange,
      onBlur,
      options,  // eslint-disable-line
      schema,   // eslint-disable-line
      formContext,  // eslint-disable-line
      registry, // eslint-disable-line
      ...inputProps
    } = this.props;

    //  console.log('value', value , 'is date valid:', moment(value, dateTimeFormat, true).isValid(), 'js format', new Date(value))
    const { dateTimeWidgetType, dateTimeAvailableDates } = options
    let dateFormat = false, timeFormat = false, format, viewMode = 'days'
    if (!dateTimeWidgetType || dateTimeWidgetType === 'dateTime') {
      dateFormat = 'DD.MM.YYYY'
      timeFormat = 'HH:mm'
      format = 'DD.MM.YYYY HH:mm'
    } else if (dateTimeWidgetType === 'date') {
      dateFormat = 'DD.MM.YYYY'
      format = 'DD.MM.YYYY'
    } else if (dateTimeWidgetType === 'time') {
      timeFormat = 'HH:mm'
      format = 'HH:mm'
      viewMode = 'time'
    }
    const { cssPrefix } = formContext
    return (
      <Datetime
        locale="ru"
        name={id}
        className={`${cssPrefix}__date-time-picker`}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        value={value}
        viewMode={viewMode}
        timeConstraints={{
          minutes: {
            step: 5,
          }
        }}
        isValidDate={validateDates(dateTimeAvailableDates)}
        onBlur={onBlur && (value => {
          console.log('blur!')
          if (/\d/.test(value)) {
            formContext.setDirty(id)
            onChange(formatDateCustom(format)(value))
          } else {
            onChange(undefined)
          }
        })}
        onChange={(value) => {
//          console.log('change datepicker:', value)
          onChange(formatDateCustom(format)(value))
        }}
        renderInput={this.renderInput}
        onFocus={() => {
          console.log('focused!')
          formContext.setTouched(id)
        }}
      />
    )
  }
}

export default DateTimeInputWidget
