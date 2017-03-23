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

        //bullet-icon
        this.bulletIcon = this.doc.querySelectorAll('.bullet-icon li');
        this.bullet = ()=> {
            this.list.map((v, i)=> {
                this.bulletIcon[i].classList.remove('on');
                if(parseInt(v.style.left) == 0) this.bulletIcon[i].classList.add('on');
            });
        }
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
                this.list[i].style.left = this.listWidth * i + 'px';
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

                                    //bullet-icon class 삽입
                                    objThis.bullet();
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
        this.nextBtn.addEventListener("click", ()=> {
            RightClick();
        }, true);
    }
    handleLeftClick(){
        const LeftClick = ()=> {
            if(this.status){
                this.status = false;
                this.list.map(()=> {
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
                            //bullet-icon class 삽입
                            objThis.bullet();
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
        this.prevBtn.addEventListener("click", ()=> {
            LeftClick();
        }, true);
    }
    //bullet 아이콘 클릭이벤트
    handleBulletClick(){
        [].forEach.call(this.bulletIcon, (li, index)=> {
            this.bulletIcon[index].addEventListener("click", ()=> {
                const tempIndex = this.list.map((v, i)=> {
                    let currentIndex = 0;
                    if(this.list[i].style.left == '0px'){
                        if(i - index < 0){
                            currentIndex = i - index;
                        }else{
                            currentIndex = i - index;
                        }
                    }
                    return currentIndex;
                });
                const listIndex = tempIndex.reduce((p,c)=> {
                    return p + c;
                });
                const tempArr = this.list.map((v)=> {
                    return parseInt(v.style.left);
                });
                const arr = tempArr.map((v, i)=> {
                    return v - (this.listWidth * Math.abs(listIndex));
                });
                if(listIndex < 0){
                    for (let i = 0; i < arr.length-1; i++) {
                        if(index == Math.abs(listIndex)){
                            if(i < index){
                                arr[i] = arr[arr.length - 1] + (this.listWidth * (i+1));
                            }
                            arr[index] = 0;
                        }
                        if(arr[i] < 0 && index != Math.abs(listIndex)){
                            const arrLeft = arr[i-1];
                            arr[i] = arrLeft + this.listWidth;
                        }
                    }
                }
                if(listIndex > 0){
                    arr.map((v, i)=> {
                        if(i >= index){
                            arr[i] = this.listWidth * (i - index);
                        }
                    });
                    arr.map((v, i)=> {
                        if(i < index){
                            arr[i] = Math.abs(arr[arr.length-1]) + (this.listWidth * (i+1));
                        }
                    });
                }
                arr.map((v, i)=> {
                    this.list[i].style.left = v + 'px';
                });
                this.bullet();
            });
        })
    }
    play(){
        this.init();
        this.handleRightClick();
        this.handleLeftClick();
        this.handleBulletClick();
    }
}

const m1 = new mSlider({
    selector: ".mSlider-wrapper",
    auto: true
});
m1.play();