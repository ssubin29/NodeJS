from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

# 솔직히 말해 왜 기동하는지 모르겠지만 이 부분을 추가하니 
# spawn 함수를 통해 python을 실행하고 그 안의 print로 한글을 출력할 때
# 한글이 깨져보이던 문제가 해결되었다. 
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

chromedriver = 'C:/dev_python/Webdriver/chromedriver.exe'
driver = webdriver.Chrome(chromedriver)

driver.get('https://lms.sungshin.ac.kr/ilos/main/member/login_form.acl')

#ID
elem = driver.find_element_by_name("loginId")
elem.clear()
elem.send_keys("20201003")

#PW
elem = driver.find_element_by_name("loginPwd")
elem.send_keys("4033414")
elem.send_keys(Keys.RETURN)

time.sleep(3)

#마이페이지 클릭
button = driver.find_element_by_id("user_photo")
button.click()

#수강과목 클릭
button_1 = driver.find_element_by_id("menu_mp_register")
button_1.click()

#이전학기 더보기
button_2 = driver.find_element_by_id("onceLecture")
button_2.click()

#수강과목 리스트 - 1 method
#subjects = driver.find_element_by_css_selector("#lecture_list")
#print(subjects.get_text())

#수강과목 리스트 - 2 method
subjects = driver.find_element_by_css_selector("#lecture_list").text
#print(subjects)

#비정규과목 제외한 수강과목 리스트
non_s = subjects.find("비정규과목")
subjects_r = subjects[:non_s]
print(subjects_r)

num_s = subjects.count("정규과목")
#print(num_s)
#subjects.replace("\n"," ")

#정규과목 위치 찾기
target = '정규과목'
index = -1
#while True:
#    index = subjects_r.find(target, index + 1)
#    if index == -1:
#        break
    #print('정규과목 =',index)
    #print('정규과목=%d' % index)

print(sys.argv[1]);