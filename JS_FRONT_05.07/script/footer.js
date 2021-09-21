'use strict';
let footerDown = document.querySelector(".footerDown");
let footerDownInner = `
<span class="footerDown__copyRight">&copy; 2017 Brand All Rights Reserved</span>
<div class="footerDown__socials">
    <i class="footerDown__socialItem fab fab fa-facebook-f"></i> 
    <i class="footerDown__socialItem fab fa-twitter"></i>
    <i class="footerDown__socialItem fab fa-instagram"></i>
    <i class="footerDown__socialItem fab fa-pinterest-p"></i>
    <i class="footerDown__socialItem fab fa-google-plus-g"></i>
</div>
`;
footerDown.insertAdjacentHTML('beforeend', footerDownInner);

let footerUp = document.querySelector(".footerUp");
let footerUpInner = `
        <div class="footerUp__left">
            <a class="headerFirst__logo" href="#"> <img src="img/Logo.png" alt="Logo"> <span class="headerFirst__brand">BRAN<span class="headerFirst__branD">D</span></span>
            </a>
            <p class="footerUp__info">Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate multidisciplinary materials before go&nbsp;forward benefits. Intrinsicly syndicate an&nbsp;expanded array of&nbsp;processes and cross-unit partnerships.</p>
            <p class="footerUp__info">Efficiently plagiarize 24/365 action items and focused infomediaries. Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.</p>
        </div>
        <div class="footerUp__right">
            <div class="footerUp__menu"> <span class="footerUp__header">COMPANY</span> <a href="#" class="footerUp__point">Home</a> <a href="" class="footerUp__point">Shop</a> <a href="#" class="footerUp__point">About</a> <a href="#" class="footerUp__point">How It Works</a> <a href="#" class="footerUp__point">Contact</a> </div>
            <div class="footerUp__menu"> <span class="footerUp__header">INFORMATION</span> <a href="#" class="footerUp__point">Tearms & Condition</a> <a href="#" class="footerUp__point">Privacy Policy</a> <a href="#" class="footerUp__point">How to Buy</a> <a href="#" class="footerUp__point">How to Sell</a> <a href="#" class="footerUp__point">Promotion</a> </div>
            <div class="footerUp__menu"> <span class="footerUp__header">SHOP CATEGORY</span> <a href="#" class="footerUp__point">Men</a> <a href="#" class="footerUp__point">Women</a> <a href="#" class="footerUp__point">Child</a> <a href="#" class="footerUp__point">Apparel</a> <a href="#" class="footerUp__point">Browse All</a> </div>
        </div>
`;
footerUp.insertAdjacentHTML('beforeend', footerUpInner);