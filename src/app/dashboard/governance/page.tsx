import { Card, CardBody } from "@/components/ui/Card";

export default function GovernancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-[#E8ECF0]">Governance</h1>
        <p className="text-sm text-[#8F98A3] mt-0.5">Protocol proposals and voting</p>
      </div>
      <Card>
        <CardBody className="py-16 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-4">🗳️</span>
          <h2 className="font-display font-semibold text-[#E8ECF0]">Coming Soon</h2>
          <p className="text-sm text-[#8F98A3] mt-2 max-w-sm">
            Token governance and on-chain voting will be available after TGE. Holders will vote on sector weights, fee structures, and new module additions.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
