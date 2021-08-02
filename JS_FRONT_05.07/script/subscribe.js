'use strict';

function checkEmail(value){
    let mailArr = value.split('');
    console.log(mailArr.length);
    if (mailArr.length === 1) {
        document.querySelector('.communication__enterEmail').value = '';
        document.querySelector('.communication__enterEmail').placeholder = 'ENTER CORRECT EMAIL';
    } else {
        const regexp = /^([!#$%&*-+{}|?/~\w]+(.?[\w]+)*@([\w-]{1,255}\.)[\w-]{2,4})?$/;
        if (regexp.test(value)) {
            // document.querySelector('.communication__enterEmail').placeholder = 'ENTER CORRECT EMAIL';
            document.querySelector('.communication__enterEmail').classList.add('displayNone');
            document.querySelector('.communication__button').classList.add('displayNone');
            document.querySelector('.communication__success').classList.remove('displayNone');
        }
    }


    const regexp = /^([!#$%&*-+{}|?/~\w]+(.?[\w]+)*@([\w-]{1,255}\.)[\w-]{2,4})?$/;
    console.log(regexp.test(value));
//!#$%&'*+-/=?^_`{|}~s
    //"(),:;<>@[\]
}

document.querySelector('.communication__form').addEventListener('submit', e => {
    e.preventDefault();
    checkEmail(document.querySelector('.communication__enterEmail').value);
});
