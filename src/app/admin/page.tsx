import { SkillsForm } from '@/components'
import IframeComponent from '@/components/shared/IFrameComponent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { env } from '@/lib/envConfig'

const { baseUrl } = env

const page = () => {
  return (
    <>
      <div className="w-full md:w-1/2 p-12 md:pr-0">
        <Tabs defaultValue="data">
          <TabsList className="w-full bg-dark-600">
            <TabsTrigger
              value="data"
              className="w-1/2 text-center font-semibold text-base hover:opacity-90 text-dark-300"
            >
              Data Form
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="w-1/2 text-center font-semibold text-base hover:opacity-90 text-dark-300"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="socials"
              className="w-1/2 text-center font-semibold text-base hover:opacity-90 text-dark-300"
            >
              Socials
            </TabsTrigger>
          </TabsList>
          <TabsContent value="data">
            {/* <AdminDataForm /> */}
            Admin data form
          </TabsContent>
          <TabsContent value="skills">
            <SkillsForm />
          </TabsContent>
          <TabsContent value="socials">
            {/* <SocialsForm/> */}
            Socials Form
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden md:flex w-1/2 h-screen p-8 sticky top-0 right-0">
        <div className="border-2 border-dark-500 size-full">
          <IframeComponent src={baseUrl} title="Preview" />
        </div>
      </div>
    </>
  )
}

export default page
