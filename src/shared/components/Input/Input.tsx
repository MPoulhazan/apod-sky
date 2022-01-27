import React, { useState } from 'react';
import './Input.scss';
import { ReactComponent as Checked } from '../../../assets/images/checked.svg';
import { ReactComponent as Unchecked } from '../../../assets/images/unchecked.svg';
import { FormControlState } from '../../service/form-control.service';

interface Props {
    name: string;
    defaultValue: string;
    placeholder?: string;
    displayCheck?: boolean;
    displayUncheck?: boolean;
    formAction?: (valToCheck: string) => FormControlState;
    checkAction?: (value: string) => void;
}

export const Input = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [validField, setValidField] = useState(true);
    const [errorMsg, setErrorMsg] = useState<any | null>(null);
    const [inputValue, setInputValue] = useState<any | null>(null);

    const handleChange = (event: any) => {
        setIsEditing(true);
        if (!!props.formAction) {
            const { valid, message } = props.formAction(event.target.value);
            setInputValue(event.target.value);
            setValidField(valid);
            setErrorMsg(message);
        }
    };

    const handleCheck = (event: any) => {
        // setInputVal(event.target.value);
        if (!!props.checkAction) {
            props.checkAction(inputValue);
        }
    };

    const defaultOrInputValue = !isEditing ? props.defaultValue : inputValue;

    return (
        <div className="input">
            <span>{props.name}</span>
            <div className="input-area">
                <input
                    className={`input-form ${validField ? '' : 'invalid'}`}
                    name="input"
                    placeholder={props.placeholder}
                    onChange={handleChange}
                    value={defaultOrInputValue}
                />
                <span className="error-msg">{errorMsg}</span>
            </div>
            {props.displayCheck && (
                <Checked onClick={handleCheck} className="btn" />
            )}
            {props.displayUncheck && <Unchecked className="btn" />}
        </div>
    );
};
