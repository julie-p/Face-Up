export default function (imageList = [], action) {

    switch (action.type) {
        case 'addImage' :
        
            return [...imageList, action.data];
        
        default :

            return imageList;
    }
};