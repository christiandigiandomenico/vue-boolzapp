const { DateTime } = luxon;

const { createApp } = Vue;

createApp({
    data() {
        return {

            showWelcomeMessage: true,
            newContact: '',

            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Mattia M.',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Emanuele P.',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Palanga R.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Federico D.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Miriam E.',
                    avatar: './img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Cassone G.',
                    avatar: './img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

            arrayAnswers: [
                "Tutto bene, a te?",
                "Secondo me no",
                "Per me è la cipolla",
                "Adesso non posso, ci sentiamo dopo!",
                "Sentiamoci dopo",
                "Oggi non mi sento tanto bene",
                "Oggi mangiamo ravioli",
                "Congratulazioni",
            ],

            activeContact: {},

            newMessageText: '',

            searchUser: '',

            isTyping: false,

            darkMode: false,

        }
    },

    mounted() {
        this.activeContact = this.contacts[0]
    },

    computed: {
        filteredContacts() {
            return this.contacts.filter(contact => {
                return contact.name.toLowerCase().includes(this.searchUser.toLowerCase());
            });
        },

        sendMessageIcon() {
            return this.isTyping ? 'fa-solid fa-paper-plane' : 'fa-solid fa-microphone';
        }
    },

    methods: {
        changeActiveContact(index) {
            const userContactIndex = this.contacts.indexOf(this.filteredContacts[index])

            this.activeContact = this.contacts[userContactIndex]

            this.showWelcomeMessage = false

        },

        sendMessage() {
            const messageContact = this.activeContact

            const newMsgObject = {

                //date: DateTime.now().toFormat('T'),
                date: new Date().toLocaleString(),
                message: this.newMessageText,
                status: 'sent'

            };

            if (this.newMessageText.length != 0 && this.newMessageText.trim()) {

                messageContact.messages.push(newMsgObject)
                this.newMessageText = ''
                this.isTyping = false;
                this.scrollToBottom();

                setTimeout(() => {

                    const newAnswer = {
                        message: this.randomAnswer(),
                        status: 'received',
                        //date: DateTime.now().toFormat('T'),
                        date: new Date().toLocaleString(),
                    }

                    messageContact.messages.push(newAnswer)
                    this.scrollToBottom();

                }, 3000)

            }

        },

        getMessageTime(messageTime) {

            const messageDateTime = messageTime.date.split(" ")[1]
            return messageDateTime.split(":").slice(0, 2).join(":");

        },

        deleteMessage(messageIndex) {
            const index = this.activeContact.messages.indexOf(messageIndex);
            if (index !== -1) {
                this.activeContact.messages.splice(index, 1);
            }
        },

        scrollToBottom() {

            const targetRef = this.$refs.myScrollEvent;
            this.$nextTick(() => {

                targetRef.scrollTo(
                    {
                        top: targetRef.scrollHeight,
                        left: 0,
                        behavior: "smooth"
                    }
                )

            })

        },

        darkModeToggle() {

            this.darkMode = !this.darkMode;

            document.documentElement.classList.toggle('dark-mode');

        },

        createContact() {
            this.contacts.push({ name: this.newContact, avatar: '../img/avatar_1.jpg', visible: true, messages: [], date: new Date().toLocaleString() });
            this.newContact = '';
        },

        randomAnswer() {
            const number = Math.floor(Math.random() * this.arrayAnswers.length);
            return this.arrayAnswers[number];
        },

        deleteChat(contactIndex) {
            const index = this.contacts.indexOf(contactIndex);
            if (index > -1) {
                this.contacts.splice(index, 1);
                this.activeContact = {}
            }
        }

    }

}).mount("#app");