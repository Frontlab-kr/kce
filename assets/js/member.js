function idDupli(sId){
	var check = '';
	$.ajax({
		type : 'post'
		, async  :  false
		, url  :  './api/member.api.php'
		, data : {
			type : 'getId'
			, id : sId
		}
		, success : function(response) {
			if(response.RESULT == 1){
				if(parseInt(response.DATA.member) > 0){
					check = 'fail';
				}else{
					check = 'ok';
				}
			}else{
				check = 'fail';
			}
		}
		, error : function(request, status, error) {
			//console.log(error);
			return;
		}
		, cache : false
		, dataType : 'json'
	});

	return check;
}

function emailDupli(sEmail){
	var check = '';
	$.ajax({
		type : 'post'
		, async  :  false
		, url  :  './api/member.api.php'
		, data : {
			type : 'getEmail'
			, email : sEmail
		}
		, success : function(response) {
			if(response.RESULT == 1){
				if(parseInt(response.DATA.member) > 0){
					check = 'fail';
				}else{
					check = 'ok';
				}
			}else{
				check = 'fail';
			}
		}
		, error : function(request, status, error) {
			//console.log(error);
			return;
		}
		, cache : false
		, dataType : 'json'
	});

	return check;
}

function joinSubmit(){
	var $user_agree1 = $("input[name='terms1']:checked").val();
	if($user_agree1 != "true"){
		alert('개인정보 수집 동의를 확인해주세요.');
		return;
	}

	var $user_agree2 = $("input[name='terms2']:checked").val();
	if($user_agree2 != "true"){
		alert('시범사업 평가 결과 무효를 확인해주세요.');
		return;
	}

	msg = confirm('신청하시겠습니까?');
	if(msg == false){
		
	}else{
		$(".invalid-tooltip").remove();

		n_invalid_cnt = 0;

		$userid = $("input[name='userid']");
		if($userid.val() == "" || !$userid.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">아이디를 입력해주세요.</div>');
			$userid.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		// 아이디 중복체크 api 만들고 추가 예정

		var id_check = idDupli($userid.val());
		if(id_check == "fail"){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">사용할 수 없는 아이디입니다.</div>');
			$userid.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		$email = $("input[name='email']");
		if($email.val() == "" || !$email.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">이메일을 입력해주세요.</div>');
			$email.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		var email = $email.val();
		var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;   

		if(regex.test(email) === false){  
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">유효하지 않은 이메일 형식입니다.</div>');
			$email.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		var email_check = emailDupli($email.val());
		if(email_check == "fail"){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">사용할 수 없는 이메일입니다.</div>');
			$email.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		$pwd = $("input[name='pwd']");
		if($pwd.val() == "" || !$pwd.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">비밀번호를 입력해주세요.</div>');
			$pwd.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		if($pwd.val().length < 8){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">비밀번호는 8자리 이상 입력해주세요.</div>');
			$pwd.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		$pwd_check = $("input[name='pwd_check']");
		if($pwd_check.val() == "" || !$pwd_check.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">비밀번호를 입력해주세요.</div>');
			$pwd_check.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		if($pwd.val() != $pwd_check.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">비밀번호가 일치하지 않습니다.</div>');
			$pwd.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		$cname = $("input[name='cname']");
		if($cname.val() == "" || !$cname.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">어린이집명을 입력해주세요.</div>');
			$cname.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		$oname = $("input[name='oname']");
		if($oname.val() == "" || !$oname.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">원장명을 입력해주세요.</div>');
			$oname.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		var namet = $oname.val();
		var namech = /[a-zA-Z0-9]/;

		if(namech.test(namet)){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">원장명은 한글만 입력해주세요.</div>');
			$oname.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		$phone = $("input[name='phone']");
		if($phone.val() == "" || !$phone.val()){
			var tmp_html = Array();

			tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">연락처를 입력해주세요.</div>');
			$phone.after(tmp_html.join(''));

			n_invalid_cnt++;
		}

		var ph = $phone.val();
		var trans_num = $phone.val();

		if(trans_num != null && trans_num != ''){
			var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;

			if(regExp_ctn.test(trans_num)){
				trans_num = ph.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
				$phone.val(trans_num);
			}else{
				var tmp_html = Array();

				tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">유효하지 않은 연락처입니다..</div>');
				$phone.after(tmp_html.join(''));

				n_invalid_cnt++;
			}
		}

		if(n_invalid_cnt > 0){
			alert('유효하지 않은 정보가 있습니다.');
			return false;
		}else{
			// 가입 처리 전 이메일 인증 시작
			var certifyEmail;
			clearInterval('certifyEmail');

			$.ajax({
				type : 'post'
				, async  :  true
				, url  :  './api/member.api.php'
				, data : {
					type : 'certifyEmail'
					, email : email
				}
				, success : function(response) {
					if(response.RESULT == 1){
						var certifyEmail = setInterval(function(){
							checkCertifyEmail(response.KEY);
						},1000);

						alert('이메일을 확인해주세요.');

						$("#memberFrmBtn").attr("onclick", "");
						$("#memberFrmBtn").on("click", function(){
							alert('발송된 이메일을 확인해주세요.');
						});
					}else{
						alert("이메일 인증전송 실패, 관리자에게 문의해주세요.");
					}
				}
				, error : function(request, status, error) {
					//console.log(error);
					return;
				}
				, cache : false
				, dataType : 'json'
			});
			//$("input[name='type']").val("insert");
			//document.member.action = "./proc/member.submit.php";
			//document.member.submit();
		}
	}
}

function checkCertifyEmail(tValue){
	$.ajax({
		type : 'post'
		, async  :  true
		, url  :  './api/member.api.php'
		, data : {
			type : 'mailCheck'
			, key : tValue
		}
		, success : function(response) {
			if(response.RESULT == 1){
				$("input[name='type']").val("insert");
				document.member.action = "./proc/member.submit.php";
				document.member.submit();
			}else{
				
			}
		}
		, error : function(request, status, error) {
			//console.log(error);
			return;
		}
		, cache : false
		, dataType : 'json'
	});
}

function userLoginSubmit(){
	$id = $("input[name='id']");
	$pw = $("input[name='pw']");

	$id_val = $id.val();
	$pw_val = $pw.val();

	n_invalid_cnt = 0;

	if($id_val == "" || !$id_val){
		var tmp_html = Array();

		tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">아이디를 입력해주세요.</div>');
		$id.after(tmp_html.join(''));

		n_invalid_cnt++;
	}

	if($pw_val == "" || !$pw_val){
		var tmp_html = Array();

		tmp_html.push('<div class="invalid-tooltip d-inline-block mt-2 me-2">비밀번호를 입력해주세요.</div>');
		$pw.after(tmp_html.join(''));

		n_invalid_cnt++;
	}

	if(n_invalid_cnt > 0){
		alert('유효하지 않은 정보가 있습니다.');
		return false;
	}else{
		$("input[name='type']").val("login");
		document.memberlogin.action = "./proc/member.submit.php";
		document.memberlogin.submit();
	}
}

function checkEmail($email){
	if($email.val() == "" || !$email.val()){
		return false;
	}

	$email.val($email.val().toLowerCase());
	var emailVal = $email.val();

	emailVal = emailVal.replace(/ /gi, "");

	var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	if (emailVal.match(regExp) != null){
		return emailVal;
	}else{
		return false;
	}
}

function sendId(){
	$inputEmail = $("input[name='input-email']");

	var $email = checkEmail($inputEmail);
	
	if($email == false){
		alert('유효하지 않은 이메일입니다.');
		return false;
	}else{

		$.ajax({
			type : 'post'
			, async  :  true
			, url  :  './api/member.api.php'
			, data : {
				type : 'sendId'
				, id : $email
			}
			, success : function(response) {
				if(response.RESULT == 1){
					alert('이메일을 확인해주세요.');
				}else{
					alert('이메일을 확인해주세요.');
				}
			}
			, error : function(request, status, error) {
				//console.log(error);
				return;
			}
			, cache : false
			, dataType : 'json'
		});
	}
}

function sendPass(){
	$inputEmail = $("input[name='input-email']");

	var $email = checkEmail($inputEmail);
	
	if($email == false){
		alert('유효하지 않은 이메일입니다.');
		return false;
	}else{

		$.ajax({
			type : 'post'
			, async  :  true
			, url  :  './api/member.api.php'
			, data : {
				type : 'sendPass'
				, id : $email
			}
			, success : function(response) {
				if(response.RESULT == 1){
					alert('이메일을 확인해주세요.');
				}else{
					alert('이메일을 확인해주세요.');
				}
			}
			, error : function(request, status, error) {
				//console.log(error);
				return;
			}
			, cache : false
			, dataType : 'json'
		});
	}
}

function pwChange(){
	var $pw =           $("input[name='pw2']");
	var $npw =          $("input[name='new_pw']");
	var $npw_chk =      $("input[name='new_pw_chk']");

	if($pw.val() == ""){
		$pw.focus();
		alert("현재 비밀번호를 입력해 주세요.");
		return false;
	}
	if($npw.val() == ""){
		$npw.focus();
		alert("새 비밀번호를 입력해주세요.");
		return false;
	}
	if($npw_chk.val() == ""){
		$npw_chk.focus();
		alert("새 비밀번호 확인을 입력해주세요.");
		return false;
	}

	if($npw.val() != $npw_chk.val()){
		$npw.focus();
		alert("비밀번호가 서로 다릅니다.");
		return false;
	}

	document.pwdFrm.action = "./proc/member.submit.php";
	document.pwdFrm.submit();
}

$(function() {
	inputNumber("js-phone");
});

function inputNumber(id) {
	//var selector="input[name="+id+"]";
	var selector = "."+id;
	$(selector).keypress(function(event) {
		if(event.which && (event.which < 48 || event.which > 57) ) {
			if(event.which == 43 || event.which == 45){
				
			}else{
				event.preventDefault();
			}
		}
	}).keyup(function(){
		if( $(this).val() != null && $(this).val() != '' ) {
			$(this).val( $(this).val().replace(/[^0-9,+,-]/g, '') );
		}
	});
};