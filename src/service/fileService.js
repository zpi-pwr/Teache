import {TOKEN_SPRING} from "../constraints";

export const fileService = {
    upload,
    download
};

function upload(id_conv, image) {
    const formData = new FormData();
    formData.append("conversationId", id_conv);
    formData.append("image", image);

    return fetch('http://localhost:8080/api/images', {
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
        fetch('http://localhost:8080/api/images?path=' + path, {
            method: 'get'
        })
        .then(response => {
            return response;
        })
    }
}