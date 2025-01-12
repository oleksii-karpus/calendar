import { PublicUser } from '../../../common/types/public.user';

export interface AppState {
    isLoading: boolean;
    user: PublicUser | null;
}
