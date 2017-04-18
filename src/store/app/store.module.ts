import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { accountReducer } from "store/app/account/reducer";
import { battleReducer } from "store/app/battle/reducer";
import { initialAppState } from "store/app/reducer";
import { BattleStateService } from "store/app/battle/state.service";

@NgModule({
  bootstrap: [],
  declarations: [],
  imports: [StoreModule.provideStore({ account: accountReducer, battle: battleReducer }, initialAppState)],
  providers: [ BattleStateService ]
})
export class AppStoreModule {

}