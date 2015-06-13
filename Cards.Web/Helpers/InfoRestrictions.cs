using System.Collections.Generic;

namespace Cards.Web.Helpers
{
    public static class InfoRestrictions
    {
        public static readonly Dictionary<FieldType, int?> Values = new Dictionary<FieldType, int?>
        {
            {FieldType.Phone, 10},
            {FieldType.Address, 15},
            {FieldType.Email, 30},
            {FieldType.Fax, 2},
            {FieldType.Skype, null},
            {FieldType.Url, null},
            {FieldType.Name, null},
            {FieldType.Position, null},
            {FieldType.Job, null}
        };
    }
}