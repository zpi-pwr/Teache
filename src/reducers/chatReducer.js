import {restConstants} from "../constraints/restConstants";


const initialState = {
    conversations: [
        {
            id: 345,
            name: "John Lennon",
            avatar: 'https://randomuser.me/api/portraits/med/men/56.jpg',
            ethWallet: null,
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
            ]
        },
        {
            id: 243,
            name: "Alisa",
            avatar: 'https://randomuser.me/api/portraits/med/women/21.jpg',
            ethWallet: "0x4e1AfC3A280cCD2FfeC3912ea691384B4AebDe58",
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Pa', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {id: 3, inputMessage: 'BlaBlaBla', id_sender: 154},
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
            ]
        },
        {
            id: 834,
            name: "Wiktor",
            avatar: 'https://randomuser.me/api/portraits/med/men/47.jpg',
            ethWallet: "0xa7916eD9A378c57E467D9546F54B04adB4fd63BC",
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'No Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {id: 4, inputMessage: 'Lorem ipsum dolor sit amet', id_sender: 154},
            ]
        },
        {
            id: 153,
            name: "Julia",
            avatar: 'https://randomuser.me/api/portraits/med/women/96.jpg',
            ethWallet: null,
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 153
                },
            ]
        },
        {
            id: 152,
            name: "Best Friend",
            avatar: 'https://randomuser.me/api/portraits/med/women/79.jpg',
            ethWallet: null,
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
            ]
        }
    ],
    groups: []
};


export function chatReducer(state = initialState, action) {
    let getConversationsHeads = () => {
        return action.data.conversations.map(fullConf => {
            return {id: fullConf.id, avatar: fullConf.avatar}
        });
    };

    let getConversations = () => {
        return action.data.conversations
    };
    switch (action.type) {
        case restConstants.GET_CONVERSATIONS_REQUEST:
            return {
                ...state,
                conversations: getConversations(),
                groups: getConversationsHeads(),
            };
        default:
            return {
                ...state,
                conversations: state.conversations,
                groups: state.conversations.map(fullConf => {
                    return {id: fullConf.id, avatar: fullConf.avatar}
                })
            }
    }
}


