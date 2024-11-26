import React from 'react'

// React Hook Form
import { Controller } from 'react-hook-form'

// React Select
import CreatableSelect from 'react-select/creatable'

const AutoComplete = props => {
    const customStyle = {
        control: (provided, state) => ({
            ...provided,
            fontSize: '14px',
            color: '#374151',
            fontFamily: 'Inter',
            minHeight: 'none',
            border: state.isFocused ? "1px solid #1e3a8a" : "1px solid #cccccc",
            boxShadow: state.isFocused ? "0px 0px 0px 1px #1e3a8a" : "none",
            backgroundColor: state.isDisabled && '#e5e7eb',
            "&:hover": {
                border: "1px solid #1e3a8a",
                boxShadow: "0px 0px 0px 1px #1e3a8a"
            }
        }),
        input: (provided, state) => ({
            ...provided,
            padding: 0,
            margin: 0,
            fontSize: '14px',
            color: '#374151',
            fontFamily: 'Inter',
            outline: 'none',
            boxShadow: 'none',
            'input:focus': {
                boxShadow: 'none',
            },
        }),
        menu: (provided, state) => ({
            ...provided,
            zIndex: 15
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
            color: state.isFocused ? '#ffffff' : '#374151',
            fontFamily: 'Inter',
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 8,
            paddingBottom: 8,
            fontWeight: 400,
            backgroundColor: state.isFocused ? '#1e3a8a' : '#ffffff',
            'option:focus': {
                color: '#ffffff',
                backgroundColor: '#1e3a8a'
            }
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 4,
            paddingBottom: 4,
        }),
        multiValue: (provided, state) => ({
            ...provided,
            marginTop: 0,
            marginBottom: 0
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: '#374151',
            paddingTop: 0,
            paddingBottom: 0,
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            padding: 0,
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            color: '#6b7280',
            padding: 4,
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            margin: 0,
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#6b7280',
            padding: 4,
        }),
    }

    const { name, options, control, isMulti, closeMenuOnSelect, disabled, onChange } = props

    return (
        <React.Fragment>
            {
                onChange ? (
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <CreatableSelect
                                {...field}
                                options={options}
                                isMulti={isMulti}
                                closeMenuOnSelect={closeMenuOnSelect}
                                styles={customStyle}
                                isClearable
                                isDisabled={disabled}
                                onChange={onChange}
                            />
                        )}
                    />
                ) : (
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <CreatableSelect
                                {...field}
                                options={options}
                                isMulti={isMulti}
                                closeMenuOnSelect={closeMenuOnSelect}
                                styles={customStyle}
                                isClearable
                                isDisabled={disabled}
                            />
                        )}
                    />
                )
            }
        </React.Fragment>
    )
}

export default AutoComplete