import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AddRoundDialog from "../components/AddRoundDialog";
import ApplicationHeader from "@/components/ApplicationHeader";
import { InterviewRoundItem } from "@/components/InterviewRoundItem";
import TopBar from "@/components/TopBar";
import EmptyState from "@/components/EmptyState";
import { env } from "@/env";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import type { ApplicationRecord } from "server/src/schemas/application";
import { ApplicationRecordSchema } from "server/src/schemas/application";
import type { InterviewRoundRecord } from "server/src/schemas/interviewRound";
import { InterviewRoundRecordSchema } from "server/src/schemas/interviewRound";

const fetchApplication = async (id: string): Promise<ApplicationRecord> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to fetch applications");
  }
  const data = await res.json();
  return ApplicationRecordSchema.parse(data);
};

const fetchRounds = async (id: string): Promise<InterviewRoundRecord[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}/rounds`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(
      errorBody.error || "Failed to fetch rounds for this application",
    );
  }
  const data = await res.json();
  return InterviewRoundRecordSchema.array().parse(data);
};

// Mounts once the rounds have loaded, so `initialIds` are the rounds that were already
// there when the application opened. Any other id was added since, and settles on its own.
const RoundTimeline = ({ rounds }: { rounds: InterviewRoundRecord[] }) => {
  const [initialIds] = useState(() => new Set(rounds.map((r) => r.id)));
  // Oldest first. Ties on date break by id, which follows creation order.
  const ordered = [...rounds].sort(
    (a, b) => a.date.getTime() - b.date.getTime() || a.id.localeCompare(b.id),
  );
  // Open animation takes ~600ms in total, however many rounds there are.
  const step = Math.min(90, 600 / Math.max(ordered.length, 1));

  return ordered.length === 0 ? (
    <EmptyState>
      <p className="text-sm text-foreground">No interview rounds yet.</p>
      <p className="mt-1 text-xs text-ink-subtle">
        Add one when it's scheduled.
      </p>
    </EmptyState>
  ) : (
    <ol>
      {ordered.map((round, index) => (
        <InterviewRoundItem
          key={round.id}
          round={round}
          isLast={index === ordered.length - 1}
          delay={index * step}
          step={step}
          fresh={!initialIds.has(round.id)}
        />
      ))}
    </ol>
  );
};

const DetailView = () => {
  const { id } = useParams();

  const {
    data: application,
    isLoading: applicationLoading,
    isError: applicationError,
  } = useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplication(id as string),
  });

  const {
    data: rounds,
    isLoading: roundLoading,
    isError: roundError,
  } = useQuery({
    queryKey: ["rounds", id],
    queryFn: () => fetchRounds(id as string),
  });
  return (
    <>
      <TopBar />
      {applicationLoading || roundLoading ? (
        <LoadingState />
      ) : applicationError ? (
        <ErrorState message="Failed to load this application" />
      ) : roundError ? (
        <ErrorState message="Failed to load interview rounds" />
      ) : (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          {application && <ApplicationHeader application={application} />}
          <div className="mt-7 mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              Interview rounds
              <span className="ml-2 text-xs font-normal text-ink-subtle tabular-nums">
                {(rounds ?? []).length}
              </span>
            </h2>
            <AddRoundDialog applicationId={id as string} />
          </div>
          <RoundTimeline key={id} rounds={rounds ?? []} />
        </div>
      )}
    </>
  );
};

export default DetailView;
