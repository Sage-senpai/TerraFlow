import { Card, CardBody } from "@/components/ui/Card";

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Docs</h1>
        <p className="text-sm text-[#8F98A3] mt-0.5">Protocol documentation and developer resources</p>
      </div>
      <Card>
        <CardBody className="py-16 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-4">📚</span>
          <h2 className="font-display font-semibold text-[#E8ECF0]">Documentation</h2>
          <p className="text-sm text-[#8F98A3] mt-2 max-w-sm">
            Full technical docs, API references, and the Sector Module SDK for building on TerraFlow are in progress.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
