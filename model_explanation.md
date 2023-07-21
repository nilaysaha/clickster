#Justify/argue your solution with assumed requirements! When there are rejected solutions, tell us why you rejected them.

For writing sometimes it is useful to dump a single document containing all the information. But precisely this becomes a source of problem later, when indexation of data become important and especially establishing relationship among different components.
We could have dumbed all the information of asset (title, description, categories etc.) into a single model. But then if we want to later scale, this will lead to issues, as we now need to separately find out the categories etc. Thus at the outset, we have decided to just keep the asset, category, and collection separate. And maintain separate table to connect the above 3 different table entries using foreign key relationship. THis also enables the maximum decoupling among different data. The above process is called normalization of data. 1NF, 2NF, 3NF etc. Higher the normalization leads to lesser repeatition and hence better for scalability. We have tried to ensure that in our model.

The model image is stored as dbmodel.png

