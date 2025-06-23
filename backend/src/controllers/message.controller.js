
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js"
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.error("Error in getMessages controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const sendMessage = async(req,res)=>{
    try {
        console.log("=== DEBUG INFO ===");
        console.log("Request body:", req.body);
        console.log("Request params:", req.params);
        console.log("Request user:", req.user);
        console.log("Content-Type:", req.headers['content-type']);
        console.log("Content-Length:", req.headers['content-length']);
        
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        
        console.log("Extracted data:");
        console.log("- text:", text);
        console.log("- image exists:", !!image);
        console.log("- image length:", image ? image.length : 0);
        console.log("- receiverId:", receiverId);
        console.log("- senderId:", senderId);
        
        let imageUrl;
        if (image) {
            console.log("Uploading image to cloudinary...");
            // Remove the data URL prefix (data:image/jpeg;base64,) if it exists
            const base64Data = image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;
            const uploadResponse = await cloudinary.uploader.upload(base64Data);
            imageUrl = uploadResponse.secure_url;
            console.log("Image uploaded successfully:", imageUrl);
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        
        console.log("Saving message to database...");
        await newMessage.save();
        console.log("Message saved successfully");

        // implement socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
            console.log("Message sent via socket to:", receiverSocketId);
        }

        res.status(201).json(newMessage);
        console.log("Response sent successfully");
        
    } catch (error) {
        console.log("=== ERROR DETAILS ===");
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);
        console.log("Error name:", error.name);
        console.log("Full error object:", error);
        console.log("====================");
        
        res.status(500).json({
            error: "Internal server error",
            details: error.message || "Unknown error"
        });
    }  
}