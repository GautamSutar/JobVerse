                                         Git hub
                        *****************************************

Git merge for incoming changes - merge code branch 1 into branch 2 

1) git status - check branch content 
2) git branch - check on which branch you are righ now ( consider branch 1 ) 
4) git fetch - pull the latest changes on your current branch  
4) git chekout ( branch name - ( consider branch 2 )  ) - switched to branch in which you want to merge the code 
5) git branch - check branch, now you are in ( consider branch 2 )
6) git pull origin branch 2 - Pull the Latest Changes from the Remote Branch
7) git merge ( branch name - ( consider branch 1 ) ) 


you can resolve conflict manually but it is too time consuming, so  allow only incoming changes and resolve commit at once use following commands

8) git checkout --theirs .
9) git add .
10) git commit -m "Merged Gautam branch into replica, accepting all incoming changes"
11) git push origin ( branch name - ( consider branch 2 ))
 

 


