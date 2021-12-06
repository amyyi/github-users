import { Observable } from 'rxjs'

export type Api<P, R> = (payload: P) => Observable<R>
