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
        this.moveItem = 0;
        this.status = true;
        this.btns = this.wrapper.querySelector('.mSlider-controls');
        this.nextBtn = this.btns.querySelector('.nextBtn');
        this.prevBtn = this.btns.querySelector('.prevBtn');
    }
    //시작시 초기화
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
            this.list.map((v, i)=> {
                this.listStyle = window.getComputedStyle(this.list[i]);
                this.listWidth = parseInt(this.listStyle.width);
                this.list[i].style.left = parseInt(this.listStyle.width) * i + 'px';
            });
        };
        listLeft();
        //반응형 대응하기 위해 선언
        window.addEventListener("resize", ()=> { listLeft(); });
    }
    //rightBtn click event
    handleRightClick(){
        const RightClick = ()=> {
            if(this.status){
                this.status = false;
                this.list.map((v,i)=> {
                    //노출되지않던 리스트가 보여지는 상태로 바뀜 처음 리스트만
                        const objThis = this;
                        this.moveItem = 0;
                        const timer = setInterval(frame, 1);

                        function frame() {
                            if (objThis.moveItem == -objThis.listWidth) {
                                clearInterval(timer);

                                //노출된 리스트가 스크린밖으로 사라지는 단계 완전히 포커싱이 끝나면 리스트 끝으로 이동한다.
                                if(parseInt(objThis.list[i].style.left) < 0) {
                                    objThis.list[i].style.left = parseInt(objThis.listWidth) * (objThis.list.length-1) + 'px';
                                }
                                objThis.status = true;
                            } else {
                                //오른쪽에 노출되지 않던 리스트가 화면으로 들어옴
                                objThis.moveItem--;
                                for (let j = 0; j < objThis.list.length; j++) {
                                    objThis.list[j].style.left = parseInt(objThis.list[j].style.left) - 1 + 'px';
                                }
                            }
                        };
                });
            }
        };
        this.nextBtn.addEventListener("click", function () {
            RightClick();
        }, false);
    }
    handleLeftClick(){
        const LeftClick = ()=> {
            if(this.status){
                this.status = false;
                this.list.map((v,i)=> {
                    //노출되지않던 리스트가 보여지는 상태로 바뀜 처음 리스트만
                    const objThis = this;
                    this.moveItem = 0;
                    const timer = setInterval(frame, 1);

                    //오른쪽 끝에 있던 리스트가 화면 왼쪽으로 이동함
                    objThis.list.map((v,i)=> {
                        if(parseInt(objThis.list[i].style.left) == objThis.listWidth * (objThis.list.length-1)){
                            objThis.list[i].style.left = -objThis.listWidth + 'px';
                        }
                    });

                    function frame() {
                        if (objThis.moveItem == -objThis.listWidth) {
                            clearInterval(timer);
                            objThis.status = true;
                        } else {
                            //리스트가 오른쪽으로 넓이값 만큼 이동
                            objThis.moveItem--;
                            for (let j = 0; j < objThis.list.length; j++) {
                                objThis.list[j].style.left = parseInt(objThis.list[j].style.left) + 1 + 'px';
                            }
                        }
                    };
                });
            }
        };
        this.prevBtn.addEventListener("click", function () {
            LeftClick();
        }, true);
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