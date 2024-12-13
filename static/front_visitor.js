const tbody= document.querySelector("tbody")
// 방명록 "등록"
function createVisitor(){
    const form= document.forms["visitor-form"]

    if(form.name.value.length === 0 || form.comment.value.length === 0){
        alert("이름과 방명록을 모두 기입해주세요!")
        return;
    }
    // 테이블 생성시 name 컬럼을 varchar(10)으로 설정해두어서
    // 프론트에서 유효성 검사를 하고 데이터 전송
    if(form.name.value.length > 10){
        alert("이름은 10글자 미만으로 작성해 주세요!")
        return
    }
    axios({
        method:"post",
        url:"/visitor",
        data: {
            name:form.name.value,
            comment:form.comment.value
        }
        // 팀플에선 api주소를 먼저 설정하고 그다음에 각자대로 생성
    }).then((res)=>{
        console.log(res.data)
        const {id,comment,name}=res.data
        // js 작성 방식
        const newHtml = `
        <tr id="tr_${id}">
            <td>${id}</td>
            <td>${name}</td>
            <td>${comment}</td>
            <td><button onclick="editVisitor(${id})">수정</button></td>
            <td><button onclick="deleteVisitor(this,${id})">삭제</button></td>
          </tr>`;
        //   tbody.append(newHtml)은 문자열이 그대로 붙음
          tbody.insertAdjacentHTML("beforeend",newHtml)
        //   문자열을 특정 요소의 맨 마지막으로 HTML추가
        form.reset()
    }).catch((err)=>{ console.error(err)})
}

// 방명록 "삭제"
// DELETE /visitor
function deleteVisitor(btn,id){
    console.log(id)
    console.log(btn)  // 태그
    axios({
        method:"delete",
        url:"/visitor",
        data:{
            id: id,
        }
    }).then((text)=>{
        console.log(text.data)
        // btn.parentElement.parentElement.remove()
        btn.closest(`#tr_${id}`).remove()  // 선택자의 가장 가까운 조상 요소 선택 closest()
    }).catch((err)=>{ console.error(err)})
}

// 수정 버튼을 누르면 
// 즉, 수정할 데이터를 가져오고, 실제 수정은 "방명록 등록"버튼이 진행
//  GET - /visitor 하나의 데이터 조회
// 1. 수정을 위한 입력창으로 변환
function editVisitor(id){
    // 데이터를 가져오는 중이라 유효성 검사 필요 없음
    axios({
        method:"get",
        url:`/visitor/${id}`,
    })
    .then((res)=>{
        console.log(res.data)
        const {name, comment, id}= res.data
        const form = document.forms["visitor-form"]
        form.name.value = name
        form.comment.value = comment

        const btnContainer = document.getElementById("btn-group")
        const html = `
        <button type="button" onclick="editDo(${id})">수정하기</button>
        <button type="button" onclick="editCancel()">수정취소</button>`
        btnContainer.innerHTML = html
    })
    .catch((err)=>{ console.error(err)})
}
// 2. 실제 수정 데이터를 요청
function editDo(id){
    const form = document.forms["visitor-form"]
    if(form.name.value.length === 0 || form.comment.value.length === 0){
        alert("이름과 방명록을 모두 기입해주세요!")
        return;
    }
    // 테이블 생성시 name 컬럼을 varchar(10)으로 설정해두어서
    // 프론트에서 유효성 검사를 하고 데이터 전송
    if(form.name.value.length > 10){
        alert("이름은 10글자 미만으로 작성해 주세요!")
        return
    }

    axios({
        method:"patch",
        url:"/visitor",
        data:{
            id:id,
            comment:form.comment.value,
            name:form.name.value,
        }
    })
    .then((res)=>{
        console.log(res.data)
        // const {id,name, comment} = res.data
        const tr = document.querySelector(`#tr_${id}`)
        console.log(tr.children)
        const children = tr.children // children = [td,td,td,td,td]
        children[1].textContent = form.name.value // 작성자
        children[2].textContent = form.comment.value // 방명록내용

        editCancel()
    })
    .catch((err)=>{ console.error(err)})
}

// 수정 취소
function editCancel(){
    // 1. form 안의 input초기화
    const form = document.forms["visitor-form"]
    // form.reset()
    form.name.value = ""
    form.comment.value = ""
    // 2. 등록 버튼이 보이도록
    const btnContainer = document.getElementById("btn-group")
    btnContainer.innerHTML = `<button type="button" onclick="createVisitor()">방명록 등록</button>`
}