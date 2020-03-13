using Telegram.Bot;

namespace API.Services
{
    public class TelegramService
    {
        private static ITelegramBotClient _botClient = new TelegramBotClient("844417138:AAHkWjNujWslCf2l2tldkvolfjGV82zc99k");
        private static string _title;

        public static async void AddTaskMessage(string title)
        {
            _title = title;
            var chatId = "-1001371342318";
            if (_title != null)
            {
                await _botClient.SendTextMessageAsync(
                  chatId: chatId,
                  text: "Added new Task:\n" + _title
                );
            }
        }
    }
}
