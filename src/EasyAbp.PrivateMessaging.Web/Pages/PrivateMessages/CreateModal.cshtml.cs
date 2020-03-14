using System.Threading.Tasks;
using EasyAbp.PrivateMessaging.PrivateMessages;
using EasyAbp.PrivateMessaging.PrivateMessages.Dtos;
using EasyAbp.PrivateMessaging.Web.Pages.PrivateMessages.InfoModels;
using Microsoft.AspNetCore.Mvc;

namespace EasyAbp.PrivateMessaging.Web.Pages.PrivateMessages
{
    public class CreateModalModel : PrivateMessagingPageModel
    {
        [BindProperty]
        public CreatePrivateMessageInfoModel PrivateMessage { get; set; }

        private readonly IPrivateMessageAppService _service;

        public CreateModalModel(IPrivateMessageAppService service)
        {
            _service = service;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            await _service.CreateAsync(
                ObjectMapper.Map<CreatePrivateMessageInfoModel, CreateUpdatePrivateMessageDto>(PrivateMessage));
            
            return NoContent();
        }
    }
}