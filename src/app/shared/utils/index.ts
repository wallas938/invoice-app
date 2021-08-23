import { EmailRegex, PasswordRegex } from './regexs/regex';
import { inputErrorStyle } from './errors-styles/error-styles';

const Regex = {
    emailRegex: EmailRegex, passwordRegex: PasswordRegex
};

const ErrorStyles = {
    inputErrorStyle
};

const Utils = {
    Regex,
    ErrorStyles
}

export default Utils;