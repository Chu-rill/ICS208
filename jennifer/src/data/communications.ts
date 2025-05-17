import { format, sub } from "date-fns";
import { Notification, Message, Conversation } from "../types/communication";
import { users } from "./users";

// Generate notifications for a user
export const generateNotifications = (userId: string): Notification[] => {
  const notifications: Notification[] = [];
  const currentDate = new Date();

  // Notifications for all users
  notifications.push({
    id: `notif-all-1-${userId}`,
    userId,
    title: "System Maintenance Complete",
    message:
      "The scheduled system maintenance has been completed successfully. All features are now available.",
    type: "info",
    read: true,
    createdAt: format(
      sub(currentDate, { days: 3 }),
      "yyyy-MM-dd'T'HH:mm:ss'Z'"
    ),
  });

  notifications.push({
    id: `notif-all-2-${userId}`,
    userId,
    title: "New Announcement Posted",
    message:
      "A new announcement about SIWES guidelines has been posted. Please review it as soon as possible.",
    type: "info",
    read: false,
    actionLink: "/announcements",
    createdAt: format(
      sub(currentDate, { days: 1 }),
      "yyyy-MM-dd'T'HH:mm:ss'Z'"
    ),
  });

  // Role-specific notifications
  const user = users.find((u) => u.id === userId);
  if (user) {
    switch (user.role) {
      case "student":
        notifications.push({
          id: `notif-student-1-${userId}`,
          userId,
          title: "Logbook Entry Reviewed",
          message:
            "Your supervisor has reviewed your latest logbook entry. Please check their comments.",
          type: "success",
          read: false,
          actionLink: "/logbook",
          createdAt: format(
            sub(currentDate, { hours: 6 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        notifications.push({
          id: `notif-student-2-${userId}`,
          userId,
          title: "Upcoming Assessment",
          message:
            "Your monthly assessment is scheduled for next week. Please prepare all required documentation.",
          type: "warning",
          read: false,
          createdAt: format(
            sub(currentDate, { hours: 12 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        notifications.push({
          id: `notif-student-3-${userId}`,
          userId,
          title: "Logbook Reminder",
          message:
            "You have not submitted a logbook entry for the past 2 days. Please update your logbook.",
          type: "error",
          read: false,
          actionLink: "/logbook/new",
          createdAt: format(
            sub(currentDate, { days: 2 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });
        break;

      case "academic_supervisor":
      case "industry_supervisor":
        notifications.push({
          id: `notif-supervisor-1-${userId}`,
          userId,
          title: "Pending Logbook Reviews",
          message:
            "You have 3 logbook entries pending review. Please complete them at your earliest convenience.",
          type: "warning",
          read: false,
          actionLink: "/supervisor/reviews",
          createdAt: format(
            sub(currentDate, { hours: 4 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        notifications.push({
          id: `notif-supervisor-2-${userId}`,
          userId,
          title: "New Student Assigned",
          message:
            "A new student has been assigned to you for supervision. Please review their details.",
          type: "info",
          read: true,
          actionLink: "/supervisor/students",
          createdAt: format(
            sub(currentDate, { days: 2 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        if (user.role === "academic_supervisor") {
          notifications.push({
            id: `notif-academic-1-${userId}`,
            userId,
            title: "Upcoming Visitation",
            message:
              "You have a scheduled visitation tomorrow for student Adebayo Johnson at TechNigeria Ltd.",
            type: "warning",
            read: false,
            actionLink: "/supervisor/visits",
            createdAt: format(
              sub(currentDate, { hours: 24 }),
              "yyyy-MM-dd'T'HH:mm:ss'Z'"
            ),
          });
        }
        break;

      case "coordinator":
        notifications.push({
          id: `notif-coordinator-1-${userId}`,
          userId,
          title: "Monthly Reports Ready",
          message:
            "The monthly SIWES reports are now available for review and distribution.",
          type: "info",
          read: false,
          actionLink: "/coordinator/reports",
          createdAt: format(
            sub(currentDate, { hours: 2 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        notifications.push({
          id: `notif-coordinator-2-${userId}`,
          userId,
          title: "Supervisor Assignment Needed",
          message:
            "There are 5 students without assigned supervisors. Please make the necessary assignments.",
          type: "warning",
          read: false,
          actionLink: "/coordinator/assignments",
          createdAt: format(
            sub(currentDate, { days: 1 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        notifications.push({
          id: `notif-coordinator-3-${userId}`,
          userId,
          title: "Low Supervisor Engagement",
          message:
            "Some supervisors have low engagement metrics. Consider scheduling a review meeting.",
          type: "error",
          read: true,
          actionLink: "/coordinator/supervisors",
          createdAt: format(
            sub(currentDate, { days: 3 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });
        break;

      case "administrator":
        notifications.push({
          id: `notif-admin-1-${userId}`,
          userId,
          title: "System Update Available",
          message:
            "A new system update is available. Please schedule installation at your convenience.",
          type: "info",
          read: false,
          actionLink: "/admin/settings",
          createdAt: format(
            sub(currentDate, { hours: 8 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        notifications.push({
          id: `notif-admin-2-${userId}`,
          userId,
          title: "New Organization Registration",
          message:
            "A new organization has registered for the SIWES program. Please review and approve.",
          type: "warning",
          read: false,
          actionLink: "/admin/organizations",
          createdAt: format(
            sub(currentDate, { days: 1 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });

        notifications.push({
          id: `notif-admin-3-${userId}`,
          userId,
          title: "User Account Issues",
          message:
            "Multiple users are reporting login issues. Please investigate the authentication system.",
          type: "error",
          read: true,
          actionLink: "/admin/users",
          createdAt: format(
            sub(currentDate, { days: 2 }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        });
        break;
    }
  }

  return notifications.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Generate conversations for a user
export const generateConversations = (userId: string): Conversation[] => {
  const conversations: Conversation[] = [];
  const currentDate = new Date();

  // Find the current user
  const currentUser = users.find((u) => u.id === userId);
  if (!currentUser) return [];

  // Determine potential conversation partners based on role
  let potentialPartners: string[] = [];

  switch (currentUser.role) {
    case "student":
      // Students can talk to their supervisors and coordinator
      potentialPartners = ["5", "6", "7", "8", "9"];
      break;
    case "academic_supervisor":
    case "industry_supervisor":
      // Supervisors can talk to students, other supervisors, and coordinator
      potentialPartners = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      break;
    case "coordinator":
      // Coordinator can talk to everyone
      potentialPartners = ["1", "2", "3", "4", "5", "6", "7", "8", "10"];
      break;
    case "administrator":
      // Admin can talk to everyone
      potentialPartners = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      break;
  }

  // Filter out the current user
  potentialPartners = potentialPartners.filter((id) => id !== userId);

  // Create 3-5 conversations
  const numConversations = Math.min(
    3 + Math.floor(Math.random() * 3),
    potentialPartners.length
  );

  for (let i = 0; i < numConversations; i++) {
    const partnerId = potentialPartners[i];
    const partner = users.find((u) => u.id === partnerId);

    if (partner) {
      // Generate a conversation with this partner
      const unreadCount =
        Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0;
      const timeAgo = Math.floor(Math.random() * 48); // Hours ago

      conversations.push({
        id: `conv-${userId}-${partnerId}`,
        participants: [
          {
            id: currentUser.id,
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            role: currentUser.role,
            avatar: currentUser.avatar,
          },
          {
            id: partner.id,
            name: `${partner.firstName} ${partner.lastName}`,
            role: partner.role,
            avatar: partner.avatar,
          },
        ],
        lastMessage: {
          content: getRandomMessage(currentUser.role, partner.role),
          senderId: Math.random() > 0.5 ? userId : partnerId,
          createdAt: format(
            sub(currentDate, { hours: timeAgo }),
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        },
        unreadCount,
      });
    }
  }

  // Sort by most recent message
  return conversations.sort(
    (a, b) =>
      new Date(b.lastMessage.createdAt).getTime() -
      new Date(a.lastMessage.createdAt).getTime()
  );
};

// Generate messages for a conversation
export const generateMessages = (
  conversationId: string,
  userId: string
): Message[] => {
  const messages: Message[] = [];
  const currentDate = new Date();

  // Find the conversation
  const conversations = generateConversations(userId);
  const conversation = conversations.find((c) => c.id === conversationId);

  if (!conversation) return [];

  // Get the participants
  const currentUser = conversation.participants.find((p) => p.id === userId);
  const otherUser = conversation.participants.find((p) => p.id !== userId);

  if (!currentUser || !otherUser) return [];

  // Generate 10-20 messages over the past few days
  const numMessages = 10 + Math.floor(Math.random() * 11);

  for (let i = 0; i < numMessages; i++) {
    const isFromCurrentUser = i % 2 === 0;
    const sender = isFromCurrentUser ? currentUser : otherUser;
    const recipient = isFromCurrentUser ? otherUser : currentUser;

    // Time decreases as we go back in history (older messages first)
    const hoursAgo = (numMessages - i) * 2 + Math.floor(Math.random() * 3);

    const message: Message = {
      id: `msg-${conversationId}-${i}`,
      conversationId,
      senderId: sender.id,
      recipientId: recipient.id,
      content: getRandomMessage(sender.role, recipient.role),
      read: hoursAgo > 24 || isFromCurrentUser,
      createdAt: format(
        sub(currentDate, { hours: hoursAgo }),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      ),
    };

    // Add an attachment to some messages
    if (i % 7 === 0) {
      message.attachment = {
        name: isFromCurrentUser ? "my_document.pdf" : "shared_file.xlsx",
        url: "#",
      };
    }

    messages.push(message);
  }

  return messages;
};

// Helper function to generate random message content
function getRandomMessage(senderRole: string, recipientRole: string): string {
  const generalMessages = [
    "Hello, how are you doing today?",
    "Good morning! I hope you're having a great day.",
    "Thanks for your quick response.",
    "I appreciate your help with this matter.",
    "Let me know if you need any additional information.",
    "I'll get back to you as soon as possible.",
    "Just checking in to see how things are going.",
    "Do you have time for a quick meeting this week?",
  ];

  const studentToSupervisorMessages = [
    "I've completed my weekly logbook entries. Could you please review them when you have time?",
    "I'm having some challenges with my current assignment. Can we schedule a discussion?",
    "Thank you for your feedback on my last entry. I've made the suggested improvements.",
    "My industry supervisor asked me to inform you about the new project I'm working on.",
    "When would be a good time for you to visit my workplace?",
    "I've uploaded my monthly progress report for your review.",
    "Could you please clarify the requirements for the final report?",
  ];

  const supervisorToStudentMessages = [
    "I've reviewed your latest logbook entries. Please see my comments.",
    "Your progress has been excellent this month. Keep up the good work.",
    "I'll be visiting your workplace next Tuesday. Please prepare a brief overview of your current projects.",
    "Please remember to submit your weekly entries on time.",
    "I've scheduled a meeting with your industry supervisor to discuss your progress.",
    "You need to provide more detailed descriptions in your logbook entries.",
    "Don't forget to document the skills you're learning in each entry.",
  ];

  const coordinatorMessages = [
    "I'm organizing a workshop for all SIWES participants next month. Please mark your calendar.",
    "The monthly assessment reports are now available. Please review them at your earliest convenience.",
    "We need to discuss the supervision allocation for the new students.",
    "Please ensure all your students have submitted their documentation on time.",
    "The academic board has requested a comprehensive report on the SIWES program progress.",
    "There will be an orientation session for new industry partners next week.",
  ];

  const adminMessages = [
    "The system will undergo maintenance this weekend. Please complete any pending tasks before Friday.",
    "We've updated the user guidelines. Please review the changes.",
    "Your account has been updated with the new permissions you requested.",
    "Please complete the required training module on the new assessment system.",
    "We're implementing new security measures. You'll need to update your password next login.",
  ];

  // Select appropriate message pool based on roles
  if (
    senderRole === "student" &&
    (recipientRole.includes("supervisor") || recipientRole === "coordinator")
  ) {
    return studentToSupervisorMessages[
      Math.floor(Math.random() * studentToSupervisorMessages.length)
    ];
  } else if (senderRole.includes("supervisor") && recipientRole === "student") {
    return supervisorToStudentMessages[
      Math.floor(Math.random() * supervisorToStudentMessages.length)
    ];
  } else if (senderRole === "coordinator") {
    return coordinatorMessages[
      Math.floor(Math.random() * coordinatorMessages.length)
    ];
  } else if (senderRole === "administrator") {
    return adminMessages[Math.floor(Math.random() * adminMessages.length)];
  } else {
    return generalMessages[Math.floor(Math.random() * generalMessages.length)];
  }
}
