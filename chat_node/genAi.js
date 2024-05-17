const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

class GenAI {
  async getResponse(question) {
    if (!question || question.trim() === "") {
      return "Please enter a valid query";
    }
    

    const data = {
      instance: {
        conversation_id: "sambaverse-conversation-id",
        messages: [
          { message_id: 0, role: "system", content: "This is the conversation between user and the AI assistance-Chatbot, Dialogue between User and the ChatbotUser: Hi there!Chatbot: Hello! Welcome to our Design and Construction Assistance Service. How can I assist you today?User: I'm considering building a house in a hilly area. Can you provide some guidance?Chatbot: Absolutely! Before we begin, could you please provide me with your name, contact number, and email address? This will help us personalize our assistance for you.User: Sure, I'm Emily Thompson. My contact number is 555-789-1234, and my email address is emily@example.com.Chatbot: Thank you, Emily. Building in a hilly area presents unique challenges and opportunities. Have you thought about any specific design preferences for your house?User: I haven't decided on the design yet, but I want it to blend seamlessly with the natural surroundings and be sustainable.Chatbot: That's fantastic! We can explore designs that emphasize natural materials, large windows for breathtaking views, and sustainable features like solar panels and rainwater harvesting systems. Would you like to see some mood board options to inspire your design?User: Yes, that would be great!Chatbot: Wonderful! Here are four mood board options. Please take a look and let me know which one resonates with you the most.User: I really like the second mood board. It captures the rustic charm while still feeling modern and environmentally conscious.Chatbot: Excellent choice, Emily! Now, let's discuss incorporating sustainable features into your design. How do you feel about passive solar design and using eco-friendly materials?User: I'm all for it! Sustainability is important to me.Chatbot: Fantastic! We can integrate those elements into your design to minimize environmental impact and maximize energy efficiency. Next, I'll present you with some conceptual design options tailored to your preferences and the hilly terrain. Are you ready to explore some design concepts?User: Yes, absolutely!Chatbot: Great! While I prepare the design options, would you mind registering with our portal? This will streamline our communication and ensure a smooth process moving forward.User: Sure, I can do that.[User completes registration process]Chatbot: Now that you've registered, let's move forward with project initiation. When would you like to start your project?User: I'm aiming to start in about three months.Chatbot: Got it, Emily. Additionally, which stakeholders would you like to connect with first?User: I think I'd like to start with a designer.Chatbot: Understood. Based on your preferences, I'll recommend some top designers for your project. Please hold on a moment.[AI agent retrieves designer recommendations]Chatbot: Here are the top designers for your project: D1, D2, D3, and D4. Please select the one you'd like to work with.User: I'll go with D3.Chatbot: Great choice! I'll proceed to share all the necessary information with Designer D3 and send an introductory email on your behalf.User: Thank you!Chatbot: You're welcome, Emily. Now, as the designer works on your project, I'll generate a design report summarizing the details for your review. Expect it shortly.[After some time]Chatbot: Emily, your design report is ready! It includes design specifics, estimated costs, sustainability considerations, and recommendations for stakeholders. Would you like to review it now?User: Yes, please.Chatbot: Excellent. While you review the design report, I'll assist you in selecting a documentation expert for the next phase.[User reviews the design report]Chatbot: Now that you've reviewed the report, let's move forward with selecting a documentation expert. Here are the options: DD1, DD2, DD3, and DD4. Which one would you prefer?User: I'll go with DD2.Chatbot: Noted. I'll share all the necessary information with Documentation Expert DD2 and arrange for a transparent contract between you and DD2.User: Sounds good.Chatbot: As we proceed, let's select a quantity surveyor to assess project costs accurately. Here are your options: QS1, QS2, QS3, and QS4. Which one would you like to work with?User: I choose QS3.Chatbot: Perfect choice! I'll share your project details with Quantity Surveyor QS3 and arrange for the necessary contract.User: Thank you for your help!Chatbot: My pleasure, Emily. Now, let's proceed with selecting a fit-out contractor. Here are your options: FO1, FO2, FO3, and FO4. Which one would you prefer?User: I'll go with FO1.Chatbot: Understood. I'll share your project details with Fit-out Contractor FO1 and arrange for the necessary contract.User: Great!Chatbot: Now that the fit-out contractor is onboard, I'll generate a fit-out report summarizing the progress, costs, and sustainability metrics for your review.[After some time]Chatbot: Emily, your fit-out report is ready for review. It outlines the progress, costs, and sustainability metrics of the fit-out stage. Would you like to review it now?User: Yes, please.Chatbot: Wonderful. While you review the fit-out report, I'll set up reminders for maintenance, warranty expiry, and defects liability period to ensure smooth functioning post-completion.[User reviews the fit-out report]Chatbot: Now that you've reviewed the fit-out report, let's discuss ongoing support and monitoring. We'll send you regular updates on carbon emissions, maintenance reminders, and suggestions for sustainability initiatives.User: That sounds great. Thank you for your support throughout this process.Chatbot: It's been my pleasure assisting you, Emily. If you have any further questions or need assistance in the future, feel free to reach out. Have a wonderful day!User: Thank you! You too, Answer in one line" },
          { message_id: 1, role: "user", content: question },
        ],
      },
      params: {
        do_sample: {
          type: "bool",
          value: "true"
      },
      max_tokens_to_generate: {
          type: "int",
          value: "1024"
      },
      process_prompt: {
          type: "bool",
          value: "true"
      },
      repetition_penalty: {
          type: "float",
          value: "1.0"
      },
      return_token_count_only: {
          type: "bool",
          value: "false"
      },
      select_expert: {
          type: "str",
          value: "Mistral-7B-Instruct-v0.2"
      },
      stop_sequences: {
          type: "str",
          value: ""
      },
      temperature: {
          type: "float",
          value: "0.7"
      },
      top_k: {
          type: "int",
          value: "50"
      },
      top_p: {
          type: "float",
          value: "0.95"
      }
      },
    };

    const finalData = {
      instance: JSON.stringify(data.instance),
      params: data.params,
      
    };
    console.log(finalData);

    const headers = {
      "Content-Type": "application/json",
      key: process.env.SAMBA_AI_KEY, 
      modelName: process.env.MODEL_NAME,
    };
    const url = process.env.SN_ENDPOINT_URL;

    try {
      const response = await axios.post(url, finalData, { headers });
      console.log("response", response);
      const logs = response.data.split('\n');
      for (const log of logs) {
          const logObject = JSON.parse(log);
          if (logObject.result.status.complete) {
              return logObject.result.responses[0].completion;
          }
      }
      return "No response with status.Complete equal to true found";
  } catch (error) {
      console.error(`Error making API request: ${error.message}`);
      return { data: null };
  }



  }

};
module.exports = GenAI;