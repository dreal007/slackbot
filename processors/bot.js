'use strict'

const  { createResponse, updateResponse }  = require('../processors/userResponse');

module.exports = (slackApp) => {     

    slackApp.command('/bot', async ({ command, ack, respond }) => {
        await ack();
        await createResponse(command)
        await respond({
          "attachments": [
            {
                "text": "Welcome. How are you doing?",
                "fallback": "Tell me how you feel.",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "callback_id": "feeling_selection",
                "actions": [
                    {
                        "name": "feelings_list",
                        "text": "Tell me how you feel",
                        "type": "select",
                        "options": [
                            {
                                "text": "Doing Well",
                                "value": "Doing well"
                            },
                            {
                                "text": "Neutral",
                                "value": "Neutral"
                            },
                            {
                                "text": "Feeling Lucky",
                                "value": "Feeling lucky"
                            }
                        ]
                    }
                ]
            }
        ]
        });
    });

    slackApp.action({callback_id: "feeling_selection"}, async ({ action, ack, respond, body }) => {
        await ack();
        let dataQuery = {
            username: body.user.name,
            user_id: body.user.id,
            workspace: body.team.domain,
            workspace_id: body.team.id
        }
        await updateResponse(dataQuery, {feeling: action.selected_options[0].value})
        await respond({
          "blocks": [
            {
              "type": "section",
              "block_id": "hobby_selection",
              "text": {
                "type": "mrkdwn",
                "text": "What are your favorite hobbies"
              },
              "accessory": {
                "action_id": "select_hooby",
                "type": "multi_static_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Choose a hobby"
                },
                "options": [
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Football"
                    },
                    "value": "Football"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Music"
                    },
                    "value": "Music"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Sleep"
                    },
                    "value": "Sleep"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Movies"
                    },
                    "value": "Movies"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Basketball"
                    },
                    "value": "Basketball"
                  }
                ]
              }
            }
          ]
          
        })        
    })

    slackApp.action({block_id: "hobby_selection", action_id: "select_hooby"}, async ({ action, ack, respond, body }) => {
        await ack();
        let dataQuery = {
          username: body.user.name,
          user_id: body.user.id,
          workspace: body.team.domain,
          workspace_id: body.team.id
      }
      let hobbies = action.selected_options.map((item) =>  {
        return item.value
      })

      await updateResponse(dataQuery, {hobbies})
      await respond('Thank you')
    })
}