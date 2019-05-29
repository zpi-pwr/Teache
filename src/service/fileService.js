import {TOKEN_SPRING} from "../constraints";
import {SPRING_URL} from "../constants";

export const fileService = {
    upload,
    download
};

function upload(id_conv, image) {
    const formData = new FormData();
    formData.append("conversationId", id_conv);
    formData.append("image", image);

    return fetch(SPRING_URL + '/api/images', {
            method: "post",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_SPRING)
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const path = data.message
            return path
        })
}

function download(path) {
    return dispatch => {
        fetch(SPRING_URL + '/api/images?path=' + path, {
            method: 'get'
        })
        .then(response => {
            return response;
        })
    }
}