git add .
echo -n "输入本次提交的备注:"
read -a remark
git commit -m "${remark}"
git push origin master