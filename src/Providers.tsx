import { createCtx } from '@reatom/core'
import { reatomContext as ReatomContext } from '@reatom/npm-react'

export const reatomCtx = createCtx()

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <ReatomContext.Provider value={reatomCtx}>{children}</ReatomContext.Provider>
}
