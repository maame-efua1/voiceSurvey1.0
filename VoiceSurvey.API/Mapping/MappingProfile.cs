using AutoMapper;
using VoiceSurvey.API.DTOs;
using VoiceSurvey.API.Models;

namespace VoiceSurvey.API.Mapping;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Entity to DTO
        CreateMap<Survey, SurveyDTO>().ReverseMap();
        CreateMap<Question, QuestionDTO>().ReverseMap();
        CreateMap<Option, OptionDTO>().ReverseMap();
        CreateMap<Response, ResponseDTO>().ReverseMap();
    }
}
