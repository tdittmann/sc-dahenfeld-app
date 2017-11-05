import {Injectable} from "@angular/core";
import {SocialSharing} from "@ionic-native/social-sharing";
import {Article} from "../entities/Article";
import {ToastController} from "ionic-angular";
import {Birthday} from "../entities/Birthday";
import {environment} from "../environments/environment";

@Injectable()
export class SocialSharingService {

  constructor(private socialSharing: SocialSharing, private toastCtrl: ToastController) {

  }

  shareNews(news: Article): void {
    let options = {
      subject: news.titel,
      message: environment.siteUrl + '/index.php?option=com_content&view=article&id=' + news.id
    }

    this.socialSharing.shareWithOptions(options).then(
      (result) => {
        console.log("Sharing successful");
        console.log(result);
      },
      (error) => {
        this.showErrorToast('Beim Teilen des Artikels ist etwas schief gelaufen');
        console.error(error);
      }
    );
  }

  shareBirthday(birthday: Birthday) {
    let options = {
      subject: 'Geburtstag von ' + birthday.firstname + ' ' + birthday.lastname + ' teilen',
      message: 'Alles Gute zum Geburtstag ' + birthday.firstname + ' ' + birthday.lastname + ' (' + birthday.age + ')'
    }

    this.socialSharing.shareWithOptions(options).then(
      (result) => {
        console.log("Sharing successful");
        console.log(result);
      },
      (error) => {
        this.showErrorToast('Beim Teilen ist etwas schief gelaufen');
        console.error(error);
      }
    )
  }

  private showErrorToast(pMessage: string): void {
    let toast = this.toastCtrl.create({
      message: pMessage,
      duration: 3000
    });

    toast.present();
  }

}
