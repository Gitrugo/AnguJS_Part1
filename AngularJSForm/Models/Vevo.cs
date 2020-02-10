using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace AngularJSForm.Models
{
  public class Vevo
  {
    [Required]
    [RegularExpression(@"^[a-zA-Z -éáűőúöüóíÉÁŰŐÚÖÜÓÍ]+$",  ErrorMessage = "A név csak betűket és kötőjelet tartalmazhat.")]
    public string cNev { get; set; }
    public DateTime dSzulDatum { get; set; }
    [Required]
    public int nEletKor { get; set; }
    public bool bTanulo { get; set; }
    public int nSzemSzin { get; set; }
    public int? nIskVegz { get; set; }
    public int? nIskola { get; set; }
    public string cMegjegyz { get; set; }
  }
}