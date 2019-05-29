const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.from = !isEmpty(data.from) ? data.from : "";

    if(Validator.isEmpty(data.school)){
        errors.school = "个人学历school不能为空";
    }
    if(Validator.isEmpty(data.degree)){
        errors.degree = "个人学历degree不能为空";
    }
    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = "个人学历fieldofstudy不能为空";
    }
    if(Validator.isEmpty(data.from)){
        errors.from = "个人学历from不能为空";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}