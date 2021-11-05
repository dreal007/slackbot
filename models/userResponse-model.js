"use strict"

module.exports = function (mongoose, connection) {
    const Schema = mongoose.Schema
    let ResponseDefinition
    let ResponseSchema

    ResponseDefinition = {
        username: { type: String, required: true, index:true },
        user_id: { type: String, required: true, index:true },
        workspace: { type: String, required: true },
        workspace_id: { type: String, required: true },
        greeting: { type: String },
        feeling: { type: String },
        hobbies: { type: Array, default :[]},
    }

    ResponseSchema = new Schema(ResponseDefinition, {
        collection: "user_responses",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    })

    const ResponseModel = connection.model('UserResponse', ResponseSchema)

    return ResponseModel


}