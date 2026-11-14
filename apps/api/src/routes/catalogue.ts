import type { FastifyInstance } from "fastify";
import {
  PACKAGES,
  PACKAGE_EXCLUSIONS,
  PACKAGE_INCLUSIONS,
  PRICING_POLICIES,
  PROJECTS,
  SERVICE_DETAILS,
  SOLUTIONS,
  findProject,
  findServiceDetail,
  findSolution,
} from "@double-growth/shared";
import { AppError } from "../errors.js";

/**
 * Public read-only catalogue.
 *
 * The catalogue is version-controlled in @double-growth/shared so the website
 * and the API can never disagree about a service description or a price. The
 * database stores mutable customer data (leads, orders, subscriptions), not a
 * second copy of the marketing catalogue.
 */
export function registerCatalogueRoutes(app: FastifyInstance): void {
  app.get("/api/v1/services", async () => ({
    data: SERVICE_DETAILS,
    meta: { count: SERVICE_DETAILS.length, source: "shared-catalogue" },
  }));

  app.get<{ Params: { slug: string } }>(
    "/api/v1/services/:slug",
    async (request) => {
      const service = findServiceDetail(request.params.slug);

      if (!service) {
        throw new AppError(404, "SERVICE_NOT_FOUND", "No service matches that slug.");
      }

      return { data: service };
    },
  );

  app.get("/api/v1/solutions", async () => ({
    data: SOLUTIONS,
    meta: { count: SOLUTIONS.length, source: "shared-catalogue" },
  }));

  app.get<{ Params: { slug: string } }>(
    "/api/v1/solutions/:slug",
    async (request) => {
      const solution = findSolution(request.params.slug);

      if (!solution) {
        throw new AppError(
          404,
          "SOLUTION_NOT_FOUND",
          "No solution matches that slug.",
        );
      }

      return { data: solution };
    },
  );

  app.get("/api/v1/pricing", async () => ({
    data: {
      packages: PACKAGES,
      inclusions: PACKAGE_INCLUSIONS,
      exclusions: PACKAGE_EXCLUSIONS,
      policies: PRICING_POLICIES,
    },
    meta: { currency: "INR", source: "shared-catalogue" },
  }));

  app.get("/api/v1/portfolio", async () => ({
    data: PROJECTS,
    meta: {
      count: PROJECTS.length,
      publishedClientProjects: PROJECTS.filter((project) => !project.concept).length,
      concepts: PROJECTS.filter((project) => project.concept).length,
    },
  }));

  app.get<{ Params: { slug: string } }>(
    "/api/v1/portfolio/:slug",
    async (request) => {
      const project = findProject(request.params.slug);

      if (!project) {
        throw new AppError(404, "PROJECT_NOT_FOUND", "No project matches that slug.");
      }

      return { data: project };
    },
  );
}
