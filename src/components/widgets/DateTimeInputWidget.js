import React, {PropTypes} from "react";
import Datetime from 'react-datetime'
import InputElement from 'react-input-mask'
import moment from 'moment'
import 'moment/locale/ru'
import 'react-datetime/css/react-datetime.css'

export const formatDateCustom = (format) => (date) => {
  if (!moment(date, format, true).isValid()) return date
  return date
    ? moment(new Date(date)).format(format)
    : undefined
}

export const formatDate = formatDateCustom('DD.MM.YYYY HH:mm')

function isValid(current) {
  const yesterday = Datetime.moment().subtract( 1, 'day' )
  return current.isAfter(yesterday)
}

class DateTimeInputWidget extends React.Component {
  renderInput = (props, openCalendar) => {
    const {
      value,
      onChange,
      placeholder,
      options: {
        dateTimeWidgetType,
      },
    } = this.props;

    const [date = '', time = ''] = value ? value.split(' ') : []
    const [day = '', month = '', year = ''] = date ? date.split('.') : []
    let D
    if (day.startsWith('3')) {
      D = '[01]'
    } else if (day.startsWith('0')) {
      D = '[1-9]'
    } else {
      D = '[0-9]'
    }

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
    } else if (dateTimeWidgetType === 'date') {
      defaultPlaceholder = 'ДД.ММ.ГГГГ'
      mask = 'dD.mM.y999'
    } else if (dateTimeWidgetType === 'time') {
      defaultPlaceholder = 'ЧЧ:ММ'
      mask = '12:39'
    }

    return (
      <InputElement
        mask={mask}
        maskChar={null}
        placeholder={placeholder || defaultPlaceholder}
        onChange={event => onChange(event.target.value)}
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
      options,  // eslint-disable-line
      schema,   // eslint-disable-line
      formContext,  // eslint-disable-line
      registry, // eslint-disable-line
      ...inputProps
    } = this.props;

  //  console.log('value', value , 'is date valid:', moment(value, dateTimeFormat, true).isValid(), 'js format', new Date(value))
    const { dateTimeWidgetType } = options
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
        inputProps={
          {
            className: formContext && formContext.preview
              ? 'ant-input ant-input-lg'
              : `${cssPrefix}__form-control`,
          }
        }
        isValidDate={isValid}
        onChange={(value) => {
          onChange(formatDateCustom(format)(value))
        }}
        renderInput={this.renderInput}
      />
    )
  }
}

export default DateTimeInputWidget
