'use strict';

class mSlider {
    constructor(obj){
        this.selector = obj.selector;
        this.auto = obj.auto;
        this.doc = document;
        this.wrapper = this.doc.querySelector(this.selector);
        this.listTemp = null;
        this.list = [];
        this.listStyle = null;
        this.listWidth = 0;
        this.btns = this.wrapper.querySelector('.mSlider-controls');
        this.nextBtn = this.btns.querySelector('.nextBtn');
        this.prevBtn = this.btns.querySelector('.prevBtn');
    }
    init(){
        //li 배열에 담기
        this.listTemp = this.doc.querySelector(this.selector).querySelector('ul').childNodes;
        for (let i = 0; i < this.listTemp.length; i++) {
            if(this.listTemp[i].nodeName == 'LI'){
                this.list.push(this.listTemp[i]);
            }
        }
        //각각의 li에 width값 만큼 left에 부여
        const listLeft = ()=> {
            this.listWidth = [];
            for (let i = 0; i < this.list.length; i++) {
                this.listStyle = window.getComputedStyle(this.list[i]);
                this.listWidth = parseInt(this.listStyle.width);
                this.list[i].style.left = parseInt(this.listStyle.width) * i + 'px';
            }
        };
        listLeft();
        //반응형 대응하기 위해 선언
        window.addEventListener("resize", ()=> { listLeft(); });
    }
    handleRightClick(){
        const RightClick = ()=> {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].style.left = (parseInt(this.list[i].style.left) - this.listWidth) + 'px';

                if(parseInt(this.list[i].style.left) < 0){
                    this.list[i].style.left = this.listWidth * (this.list.length - 1) + 'px';
                }
            }
        };
        this.nextBtn.addEventListener("click", function () {
            RightClick();
        }, true);
    }
    handleLeftClick(){

    }
    play(){
        this.init();
        this.handleRightClick();
        this.handleLeftClick();
    }
}

const m1 = new mSlider({
    selector: ".mSlider-wrapper",
    auto: true
});
m1.play();